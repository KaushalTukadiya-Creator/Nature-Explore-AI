import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { HomePage } from '@/pages/HomePage';
import { ExplorerPage } from '@/pages/ExplorerPage';
import { JournalPage } from '@/pages/JournalPage';
import { ActivitiesPage } from '@/pages/ActivitiesPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ToastProvider } from '@/components/ui/toast';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorerPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
