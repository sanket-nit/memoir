"use client"

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { Instagram, Twitter, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'

export default function Component() {
  const [activeSection, setActiveSection] = useState('about')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
      setIsLoaded(true)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const starAnimations = useMemo(() => {
    if (!isLoaded) return []

    return [...Array(60)].map(() => ({
      x: [Math.random() * dimensions.width, Math.random() * dimensions.width],
      y: [Math.random() * dimensions.height, Math.random() * dimensions.height],
      scale: [0, 1, 0],
      transition: {
        duration: Math.random() * 150 + 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }))
  }, [dimensions, isLoaded])

  const sections = {
    about: "the process of creation is both personal and universal—it's a reflection of the world we imagine, yet it's shaped by the constraints we embrace.",
    work: "Here you can showcase your projects and achievements.",
    writings: "Share your thoughts, ideas, and experiences through your writings."
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden relative w-full">
      {isLoaded && starAnimations.map((animation, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white bg-opacity-60 rounded-full"
          initial={{ x: animation.x[0], y: animation.y[0], scale: 0 }}
          animate={{
            x: animation.x,
            y: animation.y,
            scale: animation.scale
          }}
          transition={animation.transition}
        />
      ))}

      {/* Custom cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full border-2 border-white pointer-events-none z-50"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        animate={{ x: mousePosition.x - 1, y: mousePosition.y - 1 }}
        transition={{ type: 'spring', stiffness: 750, damping: 28 }}
      />

      <div className="w-8/12 md:w-6/12 lg:w-5/12 mx-auto px-4 py-16 relative z-10">

        <div>
          <motion.h1
            className="text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            quenching <br /> my thirst.
          </motion.h1>
        </div>

        <nav className="mb-12">
          {Object.keys(sections).map((section) => (
            <motion.button
              className={`mr-4 text-lg ${activeSection === section ? 'text-amber-200' : 'text-gray-400'}`}
              key={section}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </motion.button>
          ))}
        </nav>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          <p>{sections[activeSection as keyof typeof sections]}</p>
        </motion.div>
      </div>

      <motion.div
        className='mb-8 lg:absolute bottom-8 left-0 right-0'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-gray-400 mb-2">
          you can follow me on
        </p>
        <div className="flex justify-center gap-4">
          <Twitter className="cursor-pointer text-amber-200" />
          <Instagram className="cursor-pointer text-amber-200" />
          <Github className="cursor-pointer text-amber-200" />
          <Linkedin className="cursor-pointer text-amber-200" />
        </div>
      </motion.div>
    </div>
  )
}