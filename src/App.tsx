/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, RfqItem } from './types';
import { INITIAL_RFQ_ITEMS } from './data/catalogData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogScreen } from './screens/CatalogScreen';
import { RfqScreen } from './screens/RfqScreen';
import { TrackingScreen } from './screens/TrackingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ContactScreen } from './screens/ContactScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [rfqItems, setRfqItems] = useState<RfqItem[]>(INITIAL_RFQ_ITEMS);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0d1c2f] selection:bg-[#904d00] selection:text-white">
      {/* Fixed Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rfqCount={rfqItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-[100px]">
        {activeTab === 'catalog' && (
          <CatalogScreen
            rfqItems={rfqItems}
            setRfqItems={setRfqItems}
            onNavigateToRfq={() => setActiveTab('rfq')}
          />
        )}

        {activeTab === 'rfq' && <RfqScreen />}

        {activeTab === 'tracking' && <TrackingScreen />}

        {activeTab === 'home' && <HomeScreen setActiveTab={setActiveTab} />}

        {activeTab === 'contact' && <ContactScreen />}
      </main>

      {/* Standard Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
