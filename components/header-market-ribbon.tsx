"use client"

import {
  Cloud,
  CloudSun,
  Gauge,
  MapPin,
  CloudRain,
  Sun,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type HeaderMarketRibbonProps = {
  isScrolled: boolean
}

const weatherCities = [
  { city: "Bekasi", temperature: "31°", condition: "Cerah berawan", humidity: "68%", wind: "12 km/j", icon: CloudSun, tone: "text-amber-300" },
  { city: "Palembang", temperature: "30°", condition: "Berawan", humidity: "74%", wind: "10 km/j", icon: Cloud, tone: "text-slate-300" },
  { city: "Medan", temperature: "29°", condition: "Hujan ringan", humidity: "79%", wind: "9 km/j", icon: CloudRain, tone: "text-sky-300" },
  { city: "Palangka Raya", temperature: "32°", condition: "Cerah", humidity: "62%", wind: "14 km/j", icon: Sun, tone: "text-yellow-300" },
  { city: "Manado", temperature: "30°", condition: "Berawan", humidity: "76%", wind: "11 km/j", icon: Cloud, tone: "text-slate-300" },
  { city: "Makassar", temperature: "31°", condition: "Cerah berawan", humidity: "65%", wind: "16 km/j", icon: CloudSun, tone: "text-amber-300" },
]

const marketSnapshots = [
  { symbol: "IDX ENERGY", value: "1.842,16", change: "+0,84%" },
  { symbol: "MEDC", value: "1.285", change: "+1,58%" },
  { symbol: "PGAS", value: "1.620", change: "-0,31%" },
]

export function HeaderMarketRibbon({ isScrolled }: HeaderMarketRibbonProps) {
  const [weatherIndex, setWeatherIndex] = useState(0)
  const weather = weatherCities[weatherIndex]
  const WeatherIcon = weather.icon
  const ribbonLabelClass = isScrolled
    ? "text-foreground group-hover:text-foreground"
    : "text-background group-hover:text-background"
  const ribbonValueClass = isScrolled
    ? "text-foreground/90 group-hover:text-foreground"
    : "text-background/95 group-hover:text-background"

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWeatherIndex((index) => (index + 1) % weatherCities.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div
      className={`transition-colors duration-300 ${
        isScrolled ? "border-t border-border/70" : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto grid max-w-7xl px-4 text-[11px] sm:px-6 sm:text-xs lg:px-8 ${
          isScrolled
            ? "divide-y divide-current/10 lg:grid-cols-[30%_70%] lg:divide-x lg:divide-y-0"
            : "text-background lg:grid-cols-[30%_70%]"
        }`}
      >
        <div className="min-w-0 py-2 lg:py-2.5 lg:pr-5">
          <div className="group flex min-w-0 items-center gap-2 overflow-hidden sm:gap-3">
            <div
              className={`flex shrink-0 items-center gap-1.5 font-semibold transition-colors ${ribbonLabelClass}`}
            >
              <CloudSun className="size-3.5" />
              <Link
                href="https://data.bmkg.go.id/prakiraan-cuaca/"
                target="_blank"
                rel="noreferrer"
                className="hidden lg:inline hover:underline"
              >
                Cuaca BMKG
              </Link>
              <span className="sm:hidden">Cuaca</span>
            </div>
            <div className="relative min-w-0 flex-1 overflow-hidden">
              <motion.div
                key={weather.city}
                className={`flex items-center gap-2 whitespace-nowrap ${ribbonValueClass} transition-colors`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <WeatherIcon className={`size-3.5 ${weather.tone}`} />
                <span className="flex min-w-0 items-center gap-1 font-semibold">
                  <MapPin className="size-3 opacity-60" />
                  <span className="whitespace-nowrap">{weather.city}</span>
                </span>
                <span className="shrink-0 font-semibold">{weather.temperature}</span>
                <span className="hidden opacity-65 sm:inline">{weather.condition}</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="min-w-0 py-2 lg:py-2.5 lg:pl-5">
          <div className="group flex min-w-0 items-center gap-2 sm:gap-3">
            <div
              className={`flex shrink-0 items-center gap-1.5 font-semibold transition-colors ${ribbonLabelClass}`}
            >
              <TrendingUp className="size-3.5" />
              <Link
                href="https://www.idx.co.id/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline hover:underline"
              >
                IDX / Migas · demo
              </Link>
              <span className="sm:hidden">IDX</span>
            </div>
            <div
              className="relative min-w-0 flex-1 overflow-hidden"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              }}
            >
              <motion.div
                className="flex w-max items-center gap-8"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                {[...marketSnapshots, ...marketSnapshots].map((market, index) => (
                  <div
                    key={`${market.symbol}-${index}`}
                    className={`flex shrink-0 items-center gap-2 whitespace-nowrap transition-colors ${
                      isScrolled
                        ? "text-foreground/90 group-hover:text-foreground"
                        : "text-background/95 group-hover:text-background"
                    }`}
                  >
                    <span className="font-semibold">{market.symbol}</span>
                    <span className="opacity-75">{market.value}</span>
                    <span className={market.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"}>
                      {market.change}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
            <Gauge className="ml-auto hidden size-3.5 shrink-0 opacity-50 sm:block" />
          </div>
        </div>
      </div>
    </div>
  )
}
