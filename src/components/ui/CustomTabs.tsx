// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import '../../style/customtabs.css';

// interface TabOption {
//   key: string;
//   label: string;
//   content: React.ReactNode;
//   disabled?: boolean;
// }

// interface CustomTabsProps {
//   tabOptions: TabOption[];
//   className?: string;
//   activeKey: string;
//   setActiveKey: (key: string) => void;
// }

// const CustomTabs: React.FC<CustomTabsProps> = ({
//   tabOptions,
//   className = "",
//   activeKey,
//   setActiveKey
// }) => {
//   return (
//     <Tabs
//       activeKey={activeKey}
//       onSelect={(k) => k && setActiveKey(k)}
//       id="custom-tab"
//       className={`custom-tabs ${className}`}
//       fill
//     >
//       {tabOptions.map((tab) => (
//         <Tab
//           eventKey={tab.key}
//           title={tab.label}
//           key={tab.key}
//           disabled={tab.disabled}
//         >
//           {tab.content}
//         </Tab>
//       ))}
//     </Tabs>
//   );
// };

// export default CustomTabs;

'use client';

import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import '../../style/customtabs.css';

interface TabOption {
  key: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface CustomTabsProps {
  tabOptions: TabOption[];
  className?: string;
  activeKey: string;
  setActiveKey: (key: string) => void;
  loading?: boolean;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabOptions,
  className = "",
  activeKey,
  setActiveKey,
  loading = false
}) => {
  return (
    <div>
      <Tabs
        id="custom-tab"
        className={`custom-tabs ${className}`}
        activeKey={activeKey}
        // Prevent selecting tabs while loading
        onSelect={(k) => {
          if (loading) return;
          if (k) setActiveKey(k);
        }}
        fill
        // Explicitly ensure panels are mounted (no lazy mount/unmount)
        mountOnEnter={false}
        unmountOnExit={false}
      >
        {tabOptions.map(tab => (
          <Tab
            key={tab.key}
            eventKey={tab.key}
            // Show skeleton in title when loading, otherwise label
            title={loading ? <Skeleton width={80} height={18} /> : tab.label}
            disabled={loading ? true : !!tab.disabled}
          >
           
            {tab.content}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomTabs;



