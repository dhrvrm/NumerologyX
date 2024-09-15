'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { CheckCircle, Sparkles, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  const benefits = [
    "Enhanced Success: Attract opportunities, success, and abundance.",
    "Improved Relationships: Experience more harmonious and fulfilling connections.",
    "Personal Empowerment: Boost your confidence, self-expression, and inner peace."
  ]

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
        <Link href="/consultations" passHref>
          <Button variant="ghost" className="mb-8 text-gray-800 hover:text-blue-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center flex items-center justify-center text-gray-800">
                <Sparkles className="w-8 h-8 mr-2 text-yellow-500" />
                Name Correction Consultation
              </CardTitle>
              <CardDescription className="text-center text-lg mt-2 text-gray-600">
                Unlock Your Full Potential Through Divine Energy Alignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/images/services/consulations-general.jpg"
                  alt="Name Correction Consultation"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <p className="text-lg text-gray-700">
                Your name is more than just a label, it&apos;s a unique vibration that resonates with the energies of the universe, influencing your life&apos;s journey. We offer specialized Name Correction services that combine the ancient wisdom of numerology with divine energy alignment to help you unlock your full potential.
              </p>

              <h2 className="text-2xl font-semibold mt-6 text-gray-800">Why Name Correction?</h2>
              <p className="text-gray-700">
                Often, the name we are given at birth may not be fully aligned with our Life Path Number or may carry vibrations that attract challenges or obstacles. A name that is out of sync with your personal numerology can manifest as difficulties in various aspects of life, including relationships, career, and personal well-being.
              </p>

              <h2 className="text-2xl font-semibold mt-6 text-gray-800">Our Process</h2>
              <ul className="list-none space-y-4">
                {[
                  "Numerology Analysis: We begin by analyzing your current name using the Chaldean or Pythagorean numerology system.",
                  "Divine Energy Alignment: We integrate divine energy practices to ensure that your new name resonates with positive vibrations.",
                  "Name Correction: Based on our analysis, we suggest specific changes to your name.",
                  "Implementation Guidance: We guide you on how to introduce and embrace your corrected name in daily life."
                ].map((step, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{step}</span>
                  </motion.li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mt-6 text-gray-800">Benefits of Name Correction</h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="bg-blue-50 p-4 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-gray-700">{benefit}</p>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {isHovered ? "Transform Your Life Now" : "Book Your Consultation"}
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}