// components/TechStack.tsx
import Image from 'next/image';

interface Tech {
 name: string;
 logo: string;
 width: number;
 className?: string;
 glowColor?: string;
}

export function TechStack() {
 const techs: Tech[] = [
   {
     name: 'Next.js',
     logo: 'https://cdn.worldvectorlogo.com/logos/nextjs-13.svg',
     width: 80,
     className: 'brightness-200 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'
   },
   {
     name: 'TypeScript',
     logo: 'https://cdn.worldvectorlogo.com/logos/typescript-2.svg',
     width: 45,
     className: 'hover:drop-shadow-[0_0_10px_rgba(49,120,198,0.5)]' // Blue glow
   },
   {
     name: 'TensorFlow',
     logo: 'https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg',
     width: 45,
     className: 'hover:drop-shadow-[0_0_10px_rgba(255,160,0,0.5)]' // Orange glow
   },
   {
     name: 'PyTorch',
     logo: 'https://cdn.worldvectorlogo.com/logos/pytorch-2.svg',
     width: 40,
     className: 'hover:drop-shadow-[0_0_10px_rgba(238,64,86,0.5)]' // Red glow
   },
   {
     name: 'AdonisJS',
     logo: 'https://cdn.worldvectorlogo.com/logos/adonisjs.svg',
     width: 45,
     className: 'hover:drop-shadow-[0_0_10px_rgba(146,89,255,0.5)]' // Purple glow
   },
   {
     name: 'Cassandra',
     logo: 'https://cdn.worldvectorlogo.com/logos/cassandra.svg',
     width: 40,
     className: 'hover:drop-shadow-[0_0_10px_rgba(26,188,156,0.5)]' // Teal glow
   }
 ];

 return (
   <div className="flex flex-wrap justify-center items-center gap-12">
     {techs.map((tech) => (
       <div
         key={tech.name}
         className="group flex flex-col items-center space-y-3 transition-all duration-300 hover:scale-110"
       >
         <div className="relative h-12 flex items-center justify-center p-2">
           <div className="absolute inset-0 rounded-lg bg-slate-700/50 backdrop-blur-sm group-hover:bg-slate-500/50 transition-all duration-300" />
           <Image
             src={tech.logo}
             alt={`${tech.name} logo`}
             width={tech.width}
             height={40}
             className={`relative object-contain transition-all duration-300 ${tech.className}`}
           />
         </div>
         <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
           {tech.name}
         </span>
       </div>
     ))}
   </div>
 );
}