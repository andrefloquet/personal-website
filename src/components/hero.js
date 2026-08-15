'use client'

import { useEffect, useRef } from 'react'

const FRAME_COUNT = 40
const LAST_FRAME = FRAME_COUNT - 1
const INITIAL_FRAME = 0
const SMOOTHING_FACTOR = 0.22
const SOURCE_WIDTH = 1672
const SOURCE_HEIGHT = 941
const GESTURE_THRESHOLD_PX = 10

// Opaque subject occupies roughly this slice of the 16:9 frames.
const PERSON_LEFT_RATIO = 407 / SOURCE_WIDTH
const PERSON_RIGHT_RATIO = 1255 / SOURCE_WIDTH
const ZONE_PADDING_RATIO = 0.28

const FRAME_SOURCES = Array.from(
    { length: FRAME_COUNT },
    (_, index) => `/hero-frames/frame-${String(index).padStart(3, '0')}.webp`
)

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function isInteractiveTarget(target) {
    return Boolean(target?.closest?.('a, button, input, textarea, select, label'))
}

export default function Hero() {
    const sectionRef = useRef(null)
    const canvasRef = useRef(null)
    const portraitWrapperRef = useRef(null)
    const framesRef = useRef([])
    const currentFrameRef = useRef(INITIAL_FRAME)
    const targetFrameRef = useRef(INITIAL_FRAME)
    const animationFrameRef = useRef(0)
    const lastRenderedFrameRef = useRef(-1)
    const interactionZoneRef = useRef({ left: 0, width: 1 })
    const isTouchTrackingRef = useRef(false)
    const capturedPointerIdRef = useRef(null)
    const prefersReducedMotionRef = useRef(false)
    const touchStartRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        const canvas = canvasRef.current
        const portraitWrapper = portraitWrapperRef.current
        if (!section || !canvas || !portraitWrapper) {
            return undefined
        }

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) {
            return undefined
        }

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        prefersReducedMotionRef.current = mediaQuery.matches

        function updateInteractionZone() {
            const rect = portraitWrapper.getBoundingClientRect()
            const personLeft = rect.left + rect.width * PERSON_LEFT_RATIO
            const personRight = rect.left + rect.width * PERSON_RIGHT_RATIO
            const personWidth = Math.max(1, personRight - personLeft)
            const extraPadding = personWidth * ZONE_PADDING_RATIO

            interactionZoneRef.current = {
                left: personLeft - extraPadding,
                width: personWidth + extraPadding * 2,
            }
        }

        function drawContainedImage(image) {
            const canvasWidth = canvas.width
            const canvasHeight = canvas.height
            const imageWidth = image.naturalWidth
            const imageHeight = image.naturalHeight
            const scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight)
            const drawWidth = imageWidth * scale
            const drawHeight = imageHeight * scale
            const dx = (canvasWidth - drawWidth) / 2
            const dy = canvasHeight - drawHeight

            ctx.drawImage(image, dx, dy, drawWidth, drawHeight)
        }

        function drawFrame(frameIndex) {
            const image = framesRef.current[frameIndex]
            if (!image || !image.complete || image.naturalWidth === 0) {
                return
            }

            ctx.save()
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.globalAlpha = 1
            ctx.globalCompositeOperation = 'source-over'
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.restore()

            ctx.globalAlpha = 1
            ctx.globalCompositeOperation = 'source-over'
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
            drawContainedImage(image)
            lastRenderedFrameRef.current = frameIndex
        }

        function syncCanvasSize() {
            const rect = canvas.getBoundingClientRect()
            const dpr = window.devicePixelRatio || 1
            const pixelWidth = Math.max(1, Math.round(rect.width * dpr))
            const pixelHeight = Math.max(1, Math.round(rect.height * dpr))

            if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
                canvas.width = pixelWidth
                canvas.height = pixelHeight
                lastRenderedFrameRef.current = -1
            }

            const frameIndex = clamp(Math.round(currentFrameRef.current), 0, LAST_FRAME)
            if (lastRenderedFrameRef.current !== frameIndex) {
                drawFrame(frameIndex)
            }
        }

        function stopAnimation() {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = 0
            }
        }

        function renderCurrentFrame() {
            const frameIndex = clamp(Math.round(currentFrameRef.current), 0, LAST_FRAME)
            if (frameIndex !== lastRenderedFrameRef.current) {
                drawFrame(frameIndex)
            }
        }

        function tick() {
            const target = targetFrameRef.current
            const next = currentFrameRef.current + (target - currentFrameRef.current) * SMOOTHING_FACTOR

            if (Math.abs(target - next) < 0.01) {
                currentFrameRef.current = target
                animationFrameRef.current = 0
            } else {
                currentFrameRef.current = next
                animationFrameRef.current = requestAnimationFrame(tick)
            }

            renderCurrentFrame()
        }

        function ensureAnimating() {
            if (prefersReducedMotionRef.current || animationFrameRef.current) {
                return
            }

            animationFrameRef.current = requestAnimationFrame(tick)
        }

        function pointerToFrame(clientX) {
            const { left, width } = interactionZoneRef.current
            const normalizedX = clamp((clientX - left) / width, 0, 1)
            return normalizedX * LAST_FRAME
        }

        function setTargetFrame(frame) {
            targetFrameRef.current = clamp(frame, 0, LAST_FRAME)
            ensureAnimating()
        }

        function releasePointerCapture() {
            const pointerId = capturedPointerIdRef.current
            if (pointerId != null && section.hasPointerCapture(pointerId)) {
                section.releasePointerCapture(pointerId)
            }
            capturedPointerIdRef.current = null
        }

        function freezeAtCurrentFrame() {
            targetFrameRef.current = currentFrameRef.current
            stopAnimation()
            renderCurrentFrame()
        }

        function stopTouchTracking() {
            isTouchTrackingRef.current = false
            touchStartRef.current = null
            releasePointerCapture()
        }

        function handlePointerDown(event) {
            if (prefersReducedMotionRef.current || event.pointerType !== 'touch') {
                return
            }

            if (isInteractiveTarget(event.target)) {
                return
            }

            isTouchTrackingRef.current = true
            touchStartRef.current = {
                x: event.clientX,
                y: event.clientY,
                pointerId: event.pointerId,
                captured: false,
                active: false,
            }
            updateInteractionZone()
        }

        function handlePointerMove(event) {
            if (prefersReducedMotionRef.current) {
                return
            }

            if (event.pointerType === 'touch') {
                if (!isTouchTrackingRef.current) {
                    return
                }

                const start = touchStartRef.current
                if (start && !start.active) {
                    const dx = Math.abs(event.clientX - start.x)
                    const dy = Math.abs(event.clientY - start.y)

                    if (dx < GESTURE_THRESHOLD_PX && dy < GESTURE_THRESHOLD_PX) {
                        return
                    }

                    if (dy > dx) {
                        stopTouchTracking()
                        return
                    }

                    start.active = true

                    try {
                        section.setPointerCapture(event.pointerId)
                        capturedPointerIdRef.current = event.pointerId
                        start.captured = true
                    } catch {
                        capturedPointerIdRef.current = null
                    }
                }

                setTargetFrame(pointerToFrame(event.clientX))
                return
            }

            setTargetFrame(pointerToFrame(event.clientX))
        }

        function handlePointerUp(event) {
            if (event.pointerType !== 'touch') {
                return
            }

            const start = touchStartRef.current
            if (start?.active) {
                freezeAtCurrentFrame()
            }

            stopTouchTracking()
        }

        function handlePointerLeave(event) {
            if (prefersReducedMotionRef.current || event.pointerType === 'touch') {
                return
            }

            setTargetFrame(INITIAL_FRAME)
        }

        function handlePointerEnter(event) {
            if (prefersReducedMotionRef.current || event.pointerType === 'touch') {
                return
            }

            setTargetFrame(pointerToFrame(event.clientX))
        }

        function handleLostPointerCapture() {
            if (isTouchTrackingRef.current && touchStartRef.current?.active) {
                freezeAtCurrentFrame()
            }

            isTouchTrackingRef.current = false
            touchStartRef.current = null
            capturedPointerIdRef.current = null
        }

        function handleReducedMotionChange(event) {
            prefersReducedMotionRef.current = event.matches

            if (!event.matches) {
                return
            }

            stopTouchTracking()
            stopAnimation()
            currentFrameRef.current = INITIAL_FRAME
            targetFrameRef.current = INITIAL_FRAME
            drawFrame(INITIAL_FRAME)
        }

        function handleResize() {
            updateInteractionZone()
            syncCanvasSize()
        }

        const images = FRAME_SOURCES.map((src, index) => {
            const image = new window.Image()
            image.decoding = 'async'

            if (index === INITIAL_FRAME) {
                image.fetchPriority = 'high'
                image.onload = () => {
                    if (lastRenderedFrameRef.current === -1) {
                        drawFrame(INITIAL_FRAME)
                    }
                }
            }

            image.src = src

            if (
                index === INITIAL_FRAME &&
                image.complete &&
                image.naturalWidth > 0 &&
                lastRenderedFrameRef.current === -1
            ) {
                drawFrame(INITIAL_FRAME)
            }

            return image
        })

        framesRef.current = images

        updateInteractionZone()
        syncCanvasSize()

        const resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(section)
        resizeObserver.observe(portraitWrapper)

        const pointerListenerOptions = { passive: true }

        section.addEventListener('pointerdown', handlePointerDown, pointerListenerOptions)
        section.addEventListener('pointermove', handlePointerMove, pointerListenerOptions)
        section.addEventListener('pointerup', handlePointerUp, pointerListenerOptions)
        section.addEventListener('pointercancel', handlePointerUp, pointerListenerOptions)
        section.addEventListener('pointerleave', handlePointerLeave, pointerListenerOptions)
        section.addEventListener('pointerenter', handlePointerEnter, pointerListenerOptions)
        section.addEventListener('lostpointercapture', handleLostPointerCapture)
        window.addEventListener('scroll', updateInteractionZone, { passive: true })
        window.addEventListener('resize', handleResize)
        window.visualViewport?.addEventListener('resize', handleResize)
        mediaQuery.addEventListener('change', handleReducedMotionChange)

        return () => {
            stopAnimation()
            stopTouchTracking()
            resizeObserver.disconnect()
            section.removeEventListener('pointerdown', handlePointerDown, pointerListenerOptions)
            section.removeEventListener('pointermove', handlePointerMove, pointerListenerOptions)
            section.removeEventListener('pointerup', handlePointerUp, pointerListenerOptions)
            section.removeEventListener('pointercancel', handlePointerUp, pointerListenerOptions)
            section.removeEventListener('pointerleave', handlePointerLeave, pointerListenerOptions)
            section.removeEventListener('pointerenter', handlePointerEnter, pointerListenerOptions)
            section.removeEventListener('lostpointercapture', handleLostPointerCapture)
            window.removeEventListener('scroll', updateInteractionZone)
            window.removeEventListener('resize', handleResize)
            window.visualViewport?.removeEventListener('resize', handleResize)
            mediaQuery.removeEventListener('change', handleReducedMotionChange)
            images.forEach((image) => {
                image.onload = null
            })
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative overflow-x-clip bg-gradient-to-b from-sky-50 to-slate-50 h-auto pt-12 pb-0 touch-pan-y [&_a]:touch-manipulation"
        >
            <div className="relative grid grid-cols-1 items-center text-center max-w-9/10 mx-auto md:min-h-[80vh] md:grid-cols-2 md:items-stretch md:gap-8 md:text-left">
                <div className="relative z-10 md:self-center">
                    <h1 className="mb-8 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
                        Andre Floquet, a Software Engineer with over 18 years of experience.
                    </h1>
                    <p className="mb-10 text-lg text-slate-600">
                        Building production-ready systems across backend, frontend, cloud, mobile, and AI integrations.
                    </p>
                    <div className="flex flex-col gap-4 justify-center mx-20 md:flex-row md:justify-start md:mx-0">
                        <a className="rounded-lg bg-sky-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-sky-700" href="/Andre_Floquet_Resume.pdf" download>
                            Resume  &darr;
                        </a>
                        <a className="rounded-lg border border-slate-200 bg-white px-8 py-4 text-lg text-slate-700 transition hover:bg-slate-100" href="/Andre_Floquet_Letter.pdf" download>
                            Cover Letter &darr;
                        </a>
                    </div>
                </div>
                <div className="relative mt-8 h-[clamp(22rem,88vw,34rem)] self-end md:mt-0 md:h-auto md:min-h-full">
                    <div
                        ref={portraitWrapperRef}
                        className="pointer-events-none absolute bottom-0 left-1/2 h-full w-auto -translate-x-1/2 md:left-0 md:h-full md:max-h-[80vh] md:-translate-x-[18%]"
                        style={{ aspectRatio: `${SOURCE_WIDTH} / ${SOURCE_HEIGHT}` }}
                        role="img"
                        aria-label="Picture of Andre Floquet. The author."
                    >
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 h-full w-full drop-shadow-xl"
                            width={SOURCE_WIDTH}
                            height={SOURCE_HEIGHT}
                            aria-hidden="true"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
