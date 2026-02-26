"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { garadulagoonAnimals } from "@/lib/site-config";
import { Clock, Info, Utensils, Star, AlertCircle, Lightbulb } from "lucide-react";

export function WildlifeSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: "50px" }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`py-20 px-4 bg-green-50/40 dark:bg-green-950/10 transition-all duration-1000 ease-out flex justify-center ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            <div className="w-full max-w-7xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Wildlife Around Garadu Lagoon
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the rich biodiversity of our peaceful waters, from giant fruit bats to colorful kingfishers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {garadulagoonAnimals.map((animal) => (
                        <Card
                            key={animal.name}
                            className="overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-card border-border/50"
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={animal.image}
                                    alt={animal.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                            <CardHeader className="p-5 pb-0">
                                <CardTitle className="text-lg leading-tight">{animal.name}</CardTitle>
                                {animal.description && (
                                    <CardDescription className="mt-2 text-sm leading-relaxed">
                                        {animal.description}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="p-5 flex flex-col gap-3">
                                {animal.bestTimeToSee && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Clock className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                                        <span>
                                            <span className="font-medium text-foreground">Best Time: </span>
                                            <span className="text-muted-foreground">{animal.bestTimeToSee}</span>
                                        </span>
                                    </div>
                                )}

                                {animal.species && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Info className="w-4 h-4 mt-0.5 text-indigo-500 shrink-0" />
                                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                                            {animal.species.map((sp) => (
                                                <span key={sp} className="inline-flex items-center rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-700 dark:text-indigo-400">
                                                    {sp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {animal.feedOn && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Utensils className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                                        <div className="flex flex-wrap gap-1.5 mt-0.5">
                                            {animal.feedOn.map((food) => (
                                                <span key={food} className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                                                    {food}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {animal.highlight && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Star className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                                        <span className="text-muted-foreground">
                                            <span className="font-medium text-foreground">Highlight: </span>
                                            {animal.highlight}
                                        </span>
                                    </div>
                                )}

                                {animal.behavior && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Info className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                                        <span className="text-muted-foreground">
                                            <span className="font-medium text-foreground">Behavior: </span>
                                            {animal.behavior}
                                        </span>
                                    </div>
                                )}

                                {animal.temperament && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <AlertCircle className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
                                        <span className="text-muted-foreground">
                                            <span className="font-medium text-foreground">Temperament: </span>
                                            {animal.temperament}
                                        </span>
                                    </div>
                                )}

                                {animal.rarity && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Star className="w-4 h-4 mt-0.5 text-purple-500 shrink-0" />
                                        <span className="text-muted-foreground">
                                            <span className="font-medium text-foreground">Rarity: </span>
                                            {animal.rarity}
                                        </span>
                                    </div>
                                )}

                                {animal.tip && (
                                    <div className="flex items-start gap-2 text-sm">
                                        <Lightbulb className="w-4 h-4 mt-0.5 text-yellow-500 shrink-0" />
                                        <span className="text-muted-foreground">
                                            <span className="font-medium text-foreground">Tip: </span>
                                            {animal.tip}
                                        </span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
