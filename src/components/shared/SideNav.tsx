import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavItem } from "../../app/routes";

interface Props {
    navItems: NavItem[]
}

export const SideNav: React.FC<Props> = ({navItems}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
  
    return (
      <motion.div
        className="fixed left-0 top-0 bottom-0 hidden sm:flex flex-col bg-white border-r border-gray-300 z-40"
        layout
        animate={{ width: isExpanded ? 240 : 72 }}
        transition={{ type: "ease", stiffness: 100, damping: 20 }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >

        <div className="h-16 flex justify-center border-b border-gray-200">
          <img className="h-full" src="/nav_logo.png"/>
        </div>
  
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
  
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center gap-3 px-6 py-3 cursor-pointer
                  ${isActive ? 'text-blue-500' : 'text-gray-600 hover:text-gray-900'}
                  transition-colors relative
                `}
              >
                <Icon size={24} className="flex-shrink-0" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isExpanded ? 1 : 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-r"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </motion.div>
    );
  }