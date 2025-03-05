import { useLocation, useNavigate } from 'react-router';

import { NavItem } from '../../app/routes';

interface Props {
  navItems: NavItem[]
}

export const BottomNav: React.FC<Props> = ({navItems}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-30 sm:hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`
                  flex-1 flex flex-col items-center py-2 
                  hover:bg-gray-50 active:bg-gray-100 
                  touch-manipulation transition-colors duration-200
                  ${isActive ? 'text-blue-500' : 'text-gray-600'}
                `}
              >
                <item.icon 
                  aria-label='Навигационная кнопка'
                  size={24} 
                  className={`mb-1 transition-colors duration-200 ${isActive ? 'text-blue-500' : 'text-gray-600'}`}
                />
                <span className={`
                  text-xs transition-colors duration-200
                  ${isActive ? 'text-blue-500 font-medium' : 'text-gray-600'}
                `}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}