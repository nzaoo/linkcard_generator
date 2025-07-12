import { useEffect, useState, useCallback } from 'react'

export const useAnimations = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Parallax effect
  const useParallax = (speed: number = 0.5) => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
      const handleScroll = () => {
        setOffset(window.pageYOffset * speed)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return offset
  }

  // Intersection Observer for scroll animations
  const useIntersectionObserver = (threshold: number = 0.1) => {
    const [ref, setRef] = useState<HTMLElement | null>(null)
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
      if (!ref) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting)
        },
        { threshold }
      )

      observer.observe(ref)
      return () => observer.disconnect()
    }, [ref, threshold])

    return { ref: setRef, isIntersecting }
  }

  // Typing effect
  const useTypingEffect = (text: string, speed: number = 50) => {
    const [displayText, setDisplayText] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
      if (!text) return

      setIsTyping(true)
      setDisplayText('')
      let index = 0

      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(prev => prev + text.charAt(index))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
        }
      }, speed)

      return () => clearInterval(timer)
    }, [text, speed])

    return { displayText, isTyping }
  }

  // Particle system
  const useParticles = (count: number = 20) => {
    const [particles, setParticles] = useState<Array<{
      id: number
      x: number
      y: number
      size: number
      speed: number
      opacity: number
    }>>([])

    useEffect(() => {
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      }))

      setParticles(newParticles)
    }, [count])

    return particles
  }

  // Smooth scroll to element
  const scrollToElement = useCallback((elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId)
    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  // Hover animations
  const useHoverAnimation = () => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])

    return {
      isHovered,
      handlers: {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave
      }
    }
  }

  // Loading states
  const useLoadingState = (initialState: boolean = false) => {
    const [isLoading, setIsLoading] = useState(initialState)

    const startLoading = useCallback(() => setIsLoading(true), [])
    const stopLoading = useCallback(() => setIsLoading(false), [])

    return { isLoading, startLoading, stopLoading }
  }

  return {
    useParallax,
    useIntersectionObserver,
    useTypingEffect,
    useParticles,
    scrollToElement,
    useHoverAnimation,
    useLoadingState
  }
} 