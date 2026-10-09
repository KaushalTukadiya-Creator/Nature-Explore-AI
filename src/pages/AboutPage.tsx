import React, { useState, useEffect } from 'react';
import { Leaf, Cpu, ShieldCheck, Heart, Terminal, BookOpen, ExternalLink, Activity } from 'lucide-react';
import { checkBackendHealth } from '@/services/aiService';
import { HealthCheckResponse } from '@/types/api';
import { Badge } from '@/components/ui/badge';

export function AboutPage() {
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);

  useEffect(() => {
    checkBackendHealth()
      .then(setHealth)
      .catch((err) => console.log('Backend health check info:', err?.message));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
          <Leaf className="w-3.5 h-3.5" />
          <span>About Nature Explorer AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-sage-950 tracking-tight font-display">
          Technology Designed to Get You Outside
        </h1>
        <p className="text-base sm:text-lg text-sage-600 leading-relaxed">
          Nature Explorer AI was built for Hacktoberfest 2026 under the theme <em>Touch Grass</em>. Our mission is to transform screens from passive distractions into educational gateways toward real-world outdoor biodiversity.
        </p>
      </div>

      {/* Backend & Model Health Status */}
      <div className="p-6 rounded-3xl bg-white border border-sage-200/80 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-sage-100">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-forest-600" />
            <h3 className="text-base font-bold text-sage-950 font-display">
              Live AI Provider Status
            </h3>
          </div>
          <Badge variant={health?.status === 'healthy' ? 'forest' : 'sage'}>
            {health?.status ? `Service ${health.status}` : 'Connecting...'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-sage-500 block mb-0.5 font-medium">Active Provider:</span>
            <span className="font-bold text-sage-900">{health?.modelProvider || 'Nature Explorer Engine'}</span>
          </div>
          <div>
            <span className="text-sage-500 block mb-0.5 font-medium">Vision Model:</span>
            <span className="font-bold text-sage-900 font-mono">{health?.modelName || 'google/vit-base-patch16-224'}</span>
          </div>
          <div>
            <span className="text-sage-500 block mb-0.5 font-medium">Local Inference:</span>
            <span className="font-bold text-sage-900">
              {health?.localModelConfigured ? 'Ollama Vision Active' : 'Cloud / Standalone Provider'}
            </span>
          </div>
        </div>
      </div>

      {/* Architecture & Open Weight Philosophy */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-sage-950 font-display flex items-center gap-2">
          <Cpu className="w-6 h-6 text-forest-700" />
          Open-Weight Vision Architecture
        </h2>

        <p className="text-sm sm:text-base text-sage-700 leading-relaxed">
          Unlike apps that rely on proprietary black-box APIs, Nature Explorer AI is designed from the ground up for open-weight computer vision. It uses models like Vision Transformers (ViT), Swin Transformers, and multimodal models like Qwen2-VL or LLaVA.
        </p>

        <div className="p-5 rounded-2xl bg-sage-50 border border-sage-200 text-xs sm:text-sm text-sage-800 space-y-2">
          <p className="font-bold">Why Open Weights?</p>
          <ul className="list-disc list-inside space-y-1 text-sage-600">
            <li><strong>Privacy First:</strong> Your outdoor photos do not need to train commercial models.</li>
            <li><strong>No Vendor Lock-in:</strong> Switch easily between Hugging Face Inference and local Ollama.</li>
            <li><strong>Community Reproducibility:</strong> Anyone can audit, run, and improve the open code.</li>
          </ul>
        </div>
      </div>

      {/* How to Run Local Inference */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-sage-950 font-display flex items-center gap-2">
          <Terminal className="w-6 h-6 text-forest-700" />
          Running 100% Offline with Ollama
        </h2>

        <p className="text-sm text-sage-700 leading-relaxed">
          You can run Nature Explorer AI completely air-gapped on your laptop during camping or hiking trips without internet access:
        </p>

        <div className="bg-sage-950 text-sage-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto space-y-2">
          <p className="text-sage-400"># 1. Pull the open-weight vision model in Ollama</p>
          <p className="text-emerald-400">ollama run llava</p>
          <p className="text-sage-400 mt-2"># 2. Configure server/.env</p>
          <p>LOCAL_MODEL_ENABLED=true</p>
          <p>LOCAL_MODEL_ENDPOINT=http://localhost:11434/api/generate</p>
          <p>LOCAL_MODEL_NAME=llava</p>
        </div>
      </div>

      {/* Ethical Guidelines */}
      <div className="space-y-4 pt-4 border-t border-sage-200">
        <h2 className="text-2xl font-bold text-sage-950 font-display flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-forest-700" />
          Leave No Trace &amp; Outdoor Safety
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-sage-700">
          <div className="p-4 rounded-2xl bg-white border border-sage-200">
            <strong className="block text-sage-900 mb-1">Never Forage from AI Alone</strong>
            Do not consume wild mushrooms, berries, or roots identified by artificial intelligence. Many toxic species mimic edible ones.
          </div>
          <div className="p-4 rounded-2xl bg-white border border-sage-200">
            <strong className="block text-sage-900 mb-1">Respect Wildlife Habitats</strong>
            Observe from afar with zoom lenses. Never displace nests, step on fragile wildflower shoots, or corner animals.
          </div>
        </div>
      </div>
    </div>
  );
}
