'use client'

import { Project } from "@/app/types/Project";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const HomeClient = ({ projects }: { projects: Project[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    let iteration = 0;
    const spacing = 0.3;
    const snap = gsap.utils.snap(spacing);
    
    // Attendre que le DOM soit prêt
    if (!containerRef.current || !cardsRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".projectGallery");
    if (!cards.length) return;

    const seamlessLoop = buildSeamlessLoop(cards as HTMLElement[], spacing);
    const scrub = gsap.to(seamlessLoop, {
      totalTime: 0,
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
          wrapForward(self);
        } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
          wrapBackward(self);
        } else {
          scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
          scrub.invalidate().restart();
          self.wrapping = false;
        }
      },
      end: "+=3000",
      pin: containerRef.current,
    });

    function wrapForward(trigger) {
      iteration++;
      trigger.wrapping = true;
      trigger.scroll(trigger.start + 1);
    }

    function wrapBackward(trigger) {
      iteration--;
      if (iteration < 0) {
        iteration = projects.length;
        seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
        scrub.pause();
      }
      trigger.wrapping = true;
      trigger.scroll(trigger.end - 1);
    }

    function buildSeamlessLoop(items, spacing) {
      let overlap = Math.ceil((1 / spacing) * 2);
      let startTime = items.length * spacing + 0.5;
      let loopTime = (items.length + overlap) * spacing + 1;
      let rawSequence = gsap.timeline({ paused: true });
      let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.05);
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
        i <= items.length && seamlessLoop.add("label" + i, time);
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

    // Cleanup
    return () => {
      trigger.kill();
      seamlessLoop.kill();
      scrub.kill();
    };
  }, [projects.length]); // Add projects.length as dependency

  return (
    <div ref={containerRef} className="gallery">
      <ul ref={cardsRef} className="cards">
        {projects.map((project, index) => (
          <li
            key={`${project.id}-${index}`}
            style={{ backgroundImage: `url(${project.image})` }}
            className="projectGallery bg-no-repeat bg-center bg-cover"
          >
            <Link href={`/projects/${project.id}`} className="">
              <div className="">
                {/* <div className="p-4">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                </div> */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeClient;