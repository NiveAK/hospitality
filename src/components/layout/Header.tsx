import React from 'react';
import { Search, User, MessageCircle, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
 
const Header = () => {
  const router = useRouter();
 
  const handleLoginClick = () => {
    router.push('/user');
  };
 
  return (
    <header className="bg-[#004d40] text-white w-full h-12 fixed top-0 z-50">
      <div className="h-full w-full flex items-center justify-between pl-0">
        {/* Left side - Logos */}
        <div className="h-full flex items-center space-x-3">
          {/* Quality of Life Program Logo */}
          <div className="h-full flex items-center">
            <Image
              src="/qol-logo.png"
              alt="Quality of Life Program"
              width={90}
              height={30}
              className="object-contain max-h-[80%] drop-shadow-lg brightness-125 contrast-125 saturate-150"
            />
          </div>
          {/* Vision 2030 Logo */}
          <div className="h-full flex items-center">
            <Image
              src="/vision-2030-logo.png"
              alt="Vision 2030"
              width={70}
              height={30}
              className="object-contain max-h-[80%] drop-shadow-lg brightness-125 contrast-125 saturate-150"
            />
          </div>
          {/* KSA Logo */}
          <div className="h-full flex items-center">
            <Image
              src="/ksa-logo.png"
              alt="KSA Logo"
              width={45}
              height={30}
              className="object-contain max-h-[80%] drop-shadow-lg brightness-125 contrast-125 saturate-150"
            />
          </div>
        </div>
 
        {/* Right side - Navigation Icons */}
        <div className="flex items-center space-x-4 pr-3">
          {/* Login Button */}
          <div className="relative group">
            <button
              onClick={handleLoginClick}
              className="p-1.5 rounded-full transition-colors group-hover:bg-[#846EDB]"
            >
              <User className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-[#846EDB] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Login
            </div>
          </div>
 
          {/* Search Button */}
          <div className="relative group">
            <button className="p-1.5 rounded-full transition-colors group-hover:bg-[#846EDB]">
              <Search className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-[#846EDB] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Search
            </div>
          </div>
 
          {/* Chat Button */}
          <div className="relative group">
            <button className="p-1.5 rounded-full transition-colors group-hover:bg-[#846EDB]">
              <MessageCircle className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-[#846EDB] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Chat
            </div>
          </div>
 
          {/* FAQ Button */}
          <div className="relative group">
            <button className="p-1.5 rounded-full transition-colors group-hover:bg-[#846EDB]">
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-1 px-2 py-1 bg-[#846EDB] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              FAQ
            </div>
          </div>
 
          <button className="px-3 py-0.5 text-xs bg-white/10 rounded hover:bg-[#846EDB] transition-colors">
            عربي
          </button>
        </div>
      </div>
    </header>
  );
};
 
export default Header;