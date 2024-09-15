'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

const consultations = [
  {
    title: "Numerology Consultation",
    description: "Personalized insights based on your unique numbers to guide your life decisions.",
    link: "/consultations/numerology",
    image: "/images/services/consulations-test/consulation-remedy.jpg",
    color: "bg-purple-100"
  },
  {
    title: "Name Correction Consultation",
    description: "Adjust your name to align with positive numerological vibrations for success.",
    link: "/consultations/name-correction",
    image: "/images/services/consulations-test/consulations-general.jpg",
    color: "bg-blue-100"
  },
  {
    title: "Relationship Counseling",
    description: "Deepen your understanding of relationship dynamics and improve your connections.",
    link: "/consultations/relationship",
    image: "/images/services/consulations-test/consulation-remedy.jpg",
    color: "bg-pink-100"
  },
  {
    title: "General Counseling",
    description: "Receive expert advice on any life challenges or decisions you're facing.",
    link: "/consultations/general",
    image: "/images/services/consulations-test/consulations-general.jpg",
    color: "bg-green-100"
  },
  {
    title: "Mobile Numerology Consultation",
    description: "Convenient consultations through mobile for on-the-go guidance.",
    link: "/consultations/mobile",
    image: "/images/services/consulations-test/consulation-remedy.jpg",
    color: "bg-yellow-100"
  },
  {
    title: "Yantra Recommendation",
    description: "Harness the power of sacred symbols to enhance specific areas of your life.",
    link: "/consultations/yantra",
    image: "/images/services/consulations-test/consulations-general.jpg",
    color: "bg-indigo-100"
  },
  // ... (other consultation services)
]

export default function ConsulationCards() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className="min-h-screen text-gray-800 relative">
      <div 
        className="absolute inset-0 bg-opacity-50 backdrop-filter backdrop-blur-xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      ></div>
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.h1 
          className="text-4xl font-medium mb-12 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Consultation Services
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultations.map((consultation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`transition-all duration-300 hover:shadow-2xl overflow-hidden ${consultation.color}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={consultation.image}
                    alt={`Illustration for ${consultation.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                    {consultation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-gray-600">{consultation.description}</CardDescription>
                  <Link href={consultation.link} passHref>
                    <Button 
                      variant="secondary" 
                      className="w-full bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                    >
                      Discover More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}