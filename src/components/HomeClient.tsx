'use client'

import { Project } from "@/app/types/Project";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Extend ScrollTrigger type to include our custom property
interface CustomScrollTrigger extends ScrollTrigger {
  wrapping?: boolean;
}

const HomeClient = ({ projects }: { projects: Project[] }) => {
  const projectsDuplicated = [...projects, ...projects];
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    let iteration = 0;
    const spacing = 0.1;
    const snap = gsap.utils.snap(spacing);
    
    if (!containerRef.current || !cardsRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".projectGallery");
    if (!cards.length) return;

    const seamlessLoop = buildSeamlessLoop(cards as HTMLElement[], spacing);
    const scrub = gsap.to(seamlessLoop, {
      totalTime: 0,
      duration: 1,
      ease: "power3",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        const customSelf = self as CustomScrollTrigger;
        
        if (customSelf.progress === 1 && customSelf.direction > 0 && !customSelf.wrapping) {
          wrapForward(customSelf);
        } else if (customSelf.progress < 1e-5 && customSelf.direction < 0 && !customSelf.wrapping) {
          wrapBackward(customSelf);
        } else {
          scrub.vars.totalTime = snap((iteration + customSelf.progress) * seamlessLoop.duration());
          scrub.invalidate().restart();
          customSelf.wrapping = false;
        }
      },
      end: "+=3000",
      pin: containerRef.current,
  });

  function wrapForward(trigger: CustomScrollTrigger) {
    iteration++;
    trigger.wrapping = true;
    trigger.scroll(trigger.start + 1);
  }
  
  function wrapBackward(trigger: CustomScrollTrigger) {
    iteration--;
    if (iteration < 0) {
      iteration = projects.length;
      seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
      scrub.pause();
    }
    trigger.wrapping = true;
    trigger.scroll(trigger.end - 1);
  }

    function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
      const overlap = Math.ceil((1 / spacing) * 2);
      const startTime = items.length * spacing + 0.5;
      const loopTime = (items.length + overlap) * spacing + 1;
      const rawSequence = gsap.timeline({ paused: true });
      const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          if (this._time === this._dur) {
            this._tTime += this._dur - 0.05;
          }
        },
      });

      let time = 0;
      let i;
      let index;
      gsap.set(items, { yPercent: 400, opacity: 1, scale: 0 });

      for (i = 0; i < items.length + overlap * 2; i++) {
        index = i % items.length;
        time = i * spacing;
        rawSequence
          .fromTo(
            items[index],
            {
              scale: 0,
              opacity: 1,
            },
            {
              scale: 1,
              opacity: 1,
              zIndex: 100,
              duration: 0.5,
              yoyo: true,
              repeat: 1,
              ease: "power1.in",
              immediateRender: false,
            },
            time
          )
          .fromTo(
            items[index],
            { yPercent: 300 },
            {
              yPercent: -200,
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            time
          );
        if (i <= items.length) {
          seamlessLoop.add("label" + i, time);
        }
      }

      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none",
        })
        .fromTo(
          rawSequence,
          { time: overlap + spacing * 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none",
          }
        );

      return seamlessLoop;
    }

    return () => {
      trigger.kill();
      seamlessLoop.kill();
      scrub.kill();
    };
  }, [projects.length, projectsDuplicated.length]);

  return (
    <div ref={containerRef} className="gallery">
      <ul ref={cardsRef} className="cards">
        {projectsDuplicated.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={`/projects/${project.slug}`}
            style={{ backgroundImage: `url(${project.image})` }}
            className="projectGallery bg-no-repeat bg-contain"
          >
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HomeClient;