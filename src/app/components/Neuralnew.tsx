// components/Neuralnew.tsx
'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  layer: number;
  activation: number;
  targetX: number;
  targetY: number;
}

interface Connection {
  start: Node;
  end: Node;
  progress: number;
  weight: number;
  targetProgress: number;
}

interface Props {
  onType?: boolean;
}

export default function Neuralnew({ onType = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getResponsiveConfig = () => ({
      layers: window.innerWidth < 768 
        ? [2, 3, 2]
        : [3, 5, 6, 6, 5, 3],
      nodeRadius: window.innerWidth < 768 ? 4 : 5,
      baseGlow: window.innerWidth < 768 ? 4 : 6,
      activeGlow: window.innerWidth < 768 ? 12 : 15,
      signalSpeed: 0.02,
      hoverRadius: window.innerWidth < 768 ? 20 : 30,
      smoothness: 0.08,
      colors: {
        node: {
          base: 'rgba(79, 70, 229, 0.3)',    // indigo-600
          active: 'rgba(99, 102, 241, 0.8)',  // indigo-500
          glow: 'rgba(129, 140, 248, 0.4)',   // indigo-400
        },
        connection: {
          base: 'rgba(79, 70, 229, 0.06)',
          active: 'rgba(99, 102, 241, 0.4)',
          glow: 'rgba(129, 140, 248, 0.3)',
        }
      }
    });

    let config = getResponsiveConfig();
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      config = getResponsiveConfig();
      initializeNetwork();
    };

    const initializeNetwork = () => {
      nodes.length = 0;
      connections.length = 0;

      config.layers.forEach((nodeCount, layerIndex) => {
        const layerX = canvas.width * (0.2 + (0.6 * layerIndex / (config.layers.length - 1)));
        
        for (let i = 0; i < nodeCount; i++) {
          const spacing = canvas.height / (nodeCount + 1);
          const y = spacing * (i + 1);
          nodes.push({
            x: layerX,
            y,
            targetX: layerX,
            targetY: y,
            layer: layerIndex,
            activation: 0
          });
        }
      });

      nodes.forEach(startNode => {
        const nextLayer = nodes.filter(n => n.layer === startNode.layer + 1);
        nextLayer.forEach(endNode => {
          connections.push({
            start: startNode,
            end: endNode,
            progress: 0,
            targetProgress: 0,
            weight: Math.random() * 0.3 + 0.7
          });
        });
      });
    };

    window.addEventListener('resize', resize);
    resize();

    let mouseX = 0;
    let mouseY = 0;
    let hoveredNode: Node | null = null;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = Math.min(1, window.scrollY / maxScroll);
    };

    window.addEventListener('scroll', handleScroll);

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      hoveredNode = nodes.find(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        return Math.sqrt(dx * dx + dy * dy) < config.hoverRadius;
      }) || null;
    });
    const drawConnection = (conn: Connection, isHovered: boolean) => {
        const { start, end, progress, weight } = conn;
        const colors = config.colors.connection;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = colors.glow;
        ctx.globalCompositeOperation = 'screen';
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        
        const controlPoint1X = start.x + (end.x - start.x) * 0.4;
        const controlPoint2X = start.x + (end.x - start.x) * 0.6;
        const controlPoint1Y = start.y + (end.y - start.y) * 0.2;
        const controlPoint2Y = start.y + (end.y - start.y) * 0.8;
        
        ctx.bezierCurveTo(
          controlPoint1X, controlPoint1Y,
          controlPoint2X, controlPoint2Y,
          end.x, end.y
        );
  
        const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        
        if (isHovered || progress > 0) {
          ctx.shadowBlur = config.activeGlow;
          ctx.shadowColor = colors.glow;
          gradient.addColorStop(0, colors.active);
          gradient.addColorStop(0.5, colors.glow);
          gradient.addColorStop(1, colors.active);
          ctx.lineWidth = weight * 2;
        } else {
          ctx.shadowBlur = config.baseGlow;
          ctx.shadowColor = colors.glow;
          gradient.addColorStop(0, colors.base);
          gradient.addColorStop(1, colors.base);
          ctx.lineWidth = weight;
        }
  
        ctx.strokeStyle = gradient;
        ctx.stroke();
      };
  
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        scrollProgress += (targetScrollProgress - scrollProgress) * config.smoothness;
  
        // Activate first layer on type
        if (onType) {
          nodes.forEach(node => {
            if (node.layer === 0) {
              node.activation = 1;
            }
          });
        }
  
        connections.forEach(conn => {
          if (conn.start.layer === 0) {
            conn.targetProgress = Math.min(1, scrollProgress * 2.5);
            if (onType) conn.targetProgress = 1;
          } else {
            const prevLayerConns = connections.filter(c => 
              c.end === conn.start && c.progress > 0.2
            );
            
            if (prevLayerConns.length > 0) {
              const avgProgress = prevLayerConns.reduce((sum, c) => sum + c.progress, 0) 
                / prevLayerConns.length;
              conn.targetProgress = Math.min(1, avgProgress + config.signalSpeed);
            }
          }
          
          conn.progress += (conn.targetProgress - conn.progress) * config.smoothness * 1.5;
  
          if (conn.progress > 0) {
            conn.end.activation = Math.max(
              conn.end.activation,
              conn.progress * (1 - config.smoothness) + conn.targetProgress * config.smoothness
            );
          }
        });
  
        connections.forEach(conn => {
          const isHovered = hoveredNode === conn.start || hoveredNode === conn.end;
          drawConnection(conn, isHovered);
        });
  
        nodes.forEach(node => {
          const colors = config.colors.node;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, config.nodeRadius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79, 70, 229, ${0.05 + node.activation * 0.1})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = colors.glow;
          ctx.fill();
  
          ctx.beginPath();
          ctx.arc(node.x, node.y, config.nodeRadius, 0, Math.PI * 2);
          
          if (hoveredNode === node) {
            ctx.fillStyle = colors.active;
            ctx.shadowBlur = config.activeGlow * 1.2;
            ctx.shadowColor = colors.glow;
          } else {
            const intensity = node.activation;
            ctx.fillStyle = `rgba(79, 70, 229, ${0.3 + intensity * 0.4})`;
            ctx.shadowBlur = config.baseGlow + intensity * config.activeGlow;
            ctx.shadowColor = colors.glow;
          }
          
          ctx.fill();
  
          if (node.activation > 0 || hoveredNode === node) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, config.nodeRadius * 0.4, 0, Math.PI * 2);
            const glowIntensity = hoveredNode === node ? 0.6 : node.activation * 0.4;
            ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity * 0.5})`;
            ctx.fill();
          }
  
          node.x += (node.targetX - node.x) * config.smoothness;
          node.y += (node.targetY - node.y) * config.smoothness;
          
          node.activation *= 0.97;
        });
  
        requestAnimationFrame(animate);
      };
  
      animate();
  
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', handleScroll);
      };
    }, [onType]);
  
    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, #0A0A14, #312E81)',
          filter: 'contrast(1.1) brightness(1.1)',
        }}
      />
    );
  }
  