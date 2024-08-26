'use client'

import '@/styles/css/styles.css'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { RotateCcw } from 'lucide-react'
import { BsCashCoin } from 'react-icons/bs'
import { LogoutButton } from '@/components/auth/logout-button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserBoard } from '@/components/user-board'
import { BoardItem } from '@/components/board-item'

export const MobileToggle = () => {
  const [isOpen, setIsOpen] = useState(false)

  const user = useCurrentUser()

  if (!user) {
    return null
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div
          className={cn('btn_hamburger shrink-0', isOpen && 'active')}
          id="btn_hamburger"
        >
          <span />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0 z-[9999] w-full">
        <div className="page-sub bg-[#00152d] w-full p-[12px]">
          <div className="sidebar_left">
            <UserBoard hasMenu={false} />
          </div>

          <div className="list_menu mt-[12px]">
            <ul>
              <BoardItem
                label="Миний мэдээлэл"
                icon={<i className="icon-user"></i>}
                href="/settings/profile"
                onClick={() => setIsOpen(false)}
              />
              <BoardItem
                label="хадгаламж/татан авалт"
                icon={<i className="icon-cash"></i>}
                href="/settings/cash"
                onClick={() => setIsOpen(false)}
              />
              <BoardItem
                label="бэлэн мөнгөний үйлдэл"
                icon={<BsCashCoin size={20} />}
                href="/settings/cash-action"
                onClick={() => setIsOpen(false)}
              />
              {/* <BoardItem
                label="포인트"
                icon={<i className="icon-points"></i>}
                href="/settings/point"
                onClick={() => setIsOpen(false)}
              /> */}

              <BoardItem
                label="тоглоомын рекорд"
                icon={<i className="icon-history"></i>}
                href="/settings/history"
                onClick={() => setIsOpen(false)}
              />

              <BoardItem
                label="шинэ нууц үг"
                icon={<RotateCcw size={20} />}
                href="/settings/new-password"
                onClick={() => setIsOpen(false)}
              />

              <li>
                <LogoutButton>
                  <a>
                    <span className="icon sz-16 icon-color-red">
                      <i className="icon-logout"></i>
                    </span>
                    <span className="icon-color-red">гарах</span>
                  </a>
                </LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
