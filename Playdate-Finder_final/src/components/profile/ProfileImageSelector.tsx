import React, { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { AvatarSelector } from './AvatarSelector';
import { Tab } from '@headlessui/react';

interface ProfileImageSelectorProps {
  onImageSelect: (imageData: string) => void;
  currentImage?: string;
}

export function ProfileImageSelector({ onImageSelect, currentImage }: ProfileImageSelectorProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="space-y-4">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-purple-100 p-1">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-purple-700 shadow'
                : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-700'
              }`
            }
          >
            Upload Photo
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${selected 
                ? 'bg-white text-purple-700 shadow'
                : 'text-purple-600 hover:bg-white/[0.12] hover:text-purple-700'
              }`
            }
          >
            Choose Avatar
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-4">
          <Tab.Panel>
            <ImageUpload
              onImageSelect={async (file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  onImageSelect(reader.result as string);
                };
                reader.readAsDataURL(file);
              }}
              currentImage={currentImage}
            />
          </Tab.Panel>
          <Tab.Panel>
            <AvatarSelector
              selectedAvatar={currentImage}
              onSelect={onImageSelect}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}