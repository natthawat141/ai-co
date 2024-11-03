// components/NeuralBackground.tsx

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

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive configuration
    const getResponsiveConfig = () => ({
      // จำนวน nodes ในแต่ละ layer
      layers: window.innerWidth < 768 
        ? [2, 3, 2] // Mobile: 3 layers เพื่อความเบา
        : [3, 5, 6, 6, 5, 3], // Desktop: 6 layers แบบสมมาตร
      
      // ขนาดและ effects
      nodeRadius: window.innerWidth < 768 ? 4 : 5,    // ขนาด node
      baseGlow: window.innerWidth < 768 ? 4 : 6,      // ความสว่างพื้นฐาน
      activeGlow: window.innerWidth < 768 ? 12 : 15,  // ความสว่างเมื่อ active
      signalSpeed: 0.015,                             // ความเร็วของสัญญาณ
      hoverRadius: window.innerWidth < 768 ? 20 : 30, // รัศมีการ hover
      smoothness: 0.08,                               // ความนุ่มนวลของ animation
    });

    let config = getResponsiveConfig();

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      config = getResponsiveConfig();
      initializeNetwork();
    };

    const nodes: Node[] = [];
    const connections: Connection[] = [];

    // Initialize neural network
    const initializeNetwork = () => {
      nodes.length = 0;
      connections.length = 0;

      // Create nodes
      config.layers.forEach((nodeCount, layerIndex) => {
        // คำนวณตำแหน่ง x ของแต่ละ layer
        const layerX = canvas.width * (0.2 + (0.6 * layerIndex / (config.layers.length - 1)));
        
        // สร้าง nodes ในแต่ละ layer
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

      // Create connections ระหว่าง nodes
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

    // Event listeners
    window.addEventListener('resize', resize);
    resize();

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let hoveredNode: Node | null = null;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    // Scroll handler
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = Math.min(1, window.scrollY / maxScroll);
    };

    window.addEventListener('scroll', handleScroll);

    // Mouse move handler
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      hoveredNode = nodes.find(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        return Math.sqrt(dx * dx + dy * dy) < config.hoverRadius;
      }) || null;
    });

    // วาดเส้นเชื่อมต่อ
    const drawConnection = (conn: Connection, isHovered: boolean) => {
      const { start, end, progress, weight } = conn;
      
      // Base shadow setup
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(30, 58, 138, 0.15)';
      ctx.globalCompositeOperation = 'screen';
      
      // เริ่มวาดเส้น
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      
      // คำนวณจุดควบคุมสำหรับ Bezier curve
      const controlPoint1X = start.x + (end.x - start.x) * 0.4;
      const controlPoint2X = start.x + (end.x - start.x) * 0.6;
      const controlPoint1Y = start.y + (end.y - start.y) * 0.2;
      const controlPoint2Y = start.y + (end.y - start.y) * 0.8;
      
      // วาด Bezier curve
      ctx.bezierCurveTo(
        controlPoint1X, controlPoint1Y,
        controlPoint2X, controlPoint2Y,
        end.x, end.y
      );

      // สร้าง gradient
      const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
      
      // กำหนดสีและ effect ตามสถานะ
      if (isHovered || progress > 0) {
        ctx.shadowBlur = config.activeGlow * 0.8;
        ctx.shadowColor = `rgba(30, 58, 138, ${progress * 0.3})`;
        
        gradient.addColorStop(0, `rgba(30, 58, 138, ${progress * 0.4})`);
        gradient.addColorStop(0.5, `rgba(67, 56, 202, ${progress * 0.45})`);
        gradient.addColorStop(1, `rgba(30, 58, 138, ${progress * 0.4})`);
        
        ctx.lineWidth = weight * 2;
      } else {
        ctx.shadowBlur = config.baseGlow * 0.6;
        ctx.shadowColor = 'rgba(30, 58, 138, 0.08)';
        
        gradient.addColorStop(0, 'rgba(30, 58, 138, 0.06)');
        gradient.addColorStop(1, 'rgba(30, 58, 138, 0.04)');
        
        ctx.lineWidth = weight * 1;
      }

      ctx.strokeStyle = gradient;
      ctx.stroke();
      
      ctx.globalCompositeOperation = 'source-over';
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update scroll progress
      scrollProgress += (targetScrollProgress - scrollProgress) * config.smoothness;

      // Update connections
      connections.forEach(conn => {
        if (conn.start.layer === 0) {
          conn.targetProgress = Math.min(1, scrollProgress * 2.5);
        } else {
          const prevLayerConns = connections.filter(c => 
            c.end === conn.start && c.progress > 0.2
          );
          
          if (prevLayerConns.length > 0) {
            const avgProgress = prevLayerConns.reduce((sum, c) => sum + c.progress, 0) 
              / prevLayerConns.length;
            conn.targetProgress = Math.min(1, avgProgress + config.signalSpeed * 2);
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

      // วาด network
      connections.forEach(conn => {
        const isHovered = hoveredNode === conn.start || hoveredNode === conn.end;
        drawConnection(conn, isHovered);
      });

      // วาด nodes
      nodes.forEach(node => {
        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, config.nodeRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 58, 138, ${0.05 + node.activation * 0.1})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(30, 58, 138, 0.2)';
        ctx.fill();

        // Inner node
        ctx.beginPath();
        ctx.arc(node.x, node.y, config.nodeRadius, 0, Math.PI * 2);
        
        if (hoveredNode === node) {
          ctx.fillStyle = 'rgba(30, 58, 138, 0.8)';
          ctx.shadowBlur = config.activeGlow * 1.2;
          ctx.shadowColor = 'rgba(30, 58, 138, 0.4)';
        } else {
          const intensity = node.activation;
          ctx.fillStyle = `rgba(30, 58, 138, ${0.3 + intensity * 0.4})`;
          ctx.shadowBlur = config.baseGlow + intensity * config.activeGlow;
          ctx.shadowColor = `rgba(30, 58, 138, ${intensity * 0.3})`;
        }
        
        ctx.fill();

        // Center highlight
        if (node.activation > 0 || hoveredNode === node) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, config.nodeRadius * 0.4, 0, Math.PI * 2);
          const glowIntensity = hoveredNode === node ? 0.6 : node.activation * 0.4;
          ctx.fillStyle = `rgba(255, 255, 255, ${glowIntensity * 0.5})`;
          ctx.fill();
        }

        // Update node position
        node.x += (node.targetX - node.x) * config.smoothness;
        node.y += (node.targetY - node.y) * config.smoothness;
        
        // Decay activation
        node.activation *= 0.97;
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'linear-gradient(to bottom, #0A0A14, #1E293B)',
        filter: 'contrast(1.1) brightness(1.1)',
      }}
    />
  );
}