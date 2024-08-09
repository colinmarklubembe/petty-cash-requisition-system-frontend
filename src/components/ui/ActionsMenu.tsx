import React, { useRef, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEdit,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

interface RowActionsMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView: () => void;
  isOpen: boolean;
  closeMenu: () => void;
}

const RowActionsMenu: React.FC<RowActionsMenuProps> = ({
  onEdit,
  onDelete,
  onView,
  isOpen,
  closeMenu,
}) => {
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

  useEffect(() => {
    setIsMenuOpen(isOpen);
  }, [isOpen]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        closeMenu();
      }
    },
    [closeMenu]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  return (
    <div className="relative" ref={actionsRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center w-8 h-8 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none"
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      {isMenuOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px] py-2"
        >
          {onEdit && (
            <button
              onClick={() => {
                onEdit();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              role="menuitem"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-3" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
              role="menuitem"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-3" />
              Delete
            </button>
          )}
          <button
            onClick={() => {
              onView();
              setIsMenuOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            role="menuitem"
          >
            <FontAwesomeIcon icon={faEye} className="mr-3" />
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default RowActionsMenu;
