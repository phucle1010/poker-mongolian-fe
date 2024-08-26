'use client'

import { Player } from '@/types'

export const PlayersInRoom = ({ players }: { players: Player[] }) => {
  if (players.length === 1) {
    return (
      <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
        <img
          src={players[0].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
    )
  }

  if (players.length === 2) {
    return (
      <>
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  if (players.length === 3) {
    return (
      <>
        {/* First player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Second player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Third player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-1/3">
          <img
            src={players[2].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  if (players.length === 4) {
    return (
      <>
        {/* First player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Second player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Third player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
          <img
            src={players[2].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fourth player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-1/3">
          <img
            src={players[3].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  if (players.length === 5) {
    return (
      <>
        {/* Fist player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Second player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-2/3">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Third player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
          <img
            src={players[2].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fourth player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
          <img
            src={players[3].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fifth player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-1/3">
          <img
            src={players[4].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  if (players.length === 6) {
    return (
      <>
        {/* Fist player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Second player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-2/3">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Third player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
          <img
            src={players[2].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fourth player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
          <img
            src={players[3].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fifth player */}
        <div className="w-10 h-10 rounded-full absolute right-1/4 top-1/3">
          <img
            src={players[4].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Sixth player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-2/3">
          <img
            src={players[5].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  if (players.length === 7) {
    return (
      <>
        {/* First player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Second player */}
        <div className="w-10 h-10 rounded-full absolute left-1/4 bottom-8 md:bottom-0">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Third player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-2/3">
          <img
            src={players[2].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fourth player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
          <img
            src={players[3].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fifth player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
          <img
            src={players[4].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Sixth player */}
        <div className="w-10 h-10 rounded-full absolute right-1/4 top-1/3">
          <img
            src={players[5].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Seventh player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-2/3">
          <img
            src={players[6].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  if (players.length === 8) {
    return (
      <>
        {/* First player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Second player */}
        <div className="w-10 h-10 rounded-full absolute left-1/4 bottom-8 md:bottom-0">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Third player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-2/3">
          <img
            src={players[2].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fourth player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
          <img
            src={players[3].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fifth player */}
        <div className="w-10 h-10 rounded-full absolute left-1/4 top-10 md:top-0">
          <img
            src={players[4].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Sixth player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
          <img
            src={players[5].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Seventh player */}
        <div className="w-10 h-10 rounded-full absolute right-1/4 top-10 md:top-0">
          <img
            src={players[6].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Eighth player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-1/3">
          <img
            src={players[7].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  if (players.length === 9) {
    return (
      <>
        {/* First player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
          <img
            src={players[0].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Second player */}
        <div className="w-10 h-10 rounded-full absolute left-1/4 bottom-8 md:bottom-0">
          <img
            src={players[1].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Third player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-2/3">
          <img
            src={players[2].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fourth player */}
        <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
          <img
            src={players[3].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Fifth player */}
        <div className="w-10 h-10 rounded-full absolute left-1/4 top-10 md:top-0">
          <img
            src={players[4].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Sixth player */}
        <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
          <img
            src={players[5].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Seventh player */}
        <div className="w-10 h-10 rounded-full absolute right-1/4 top-10 md:top-0">
          <img
            src={players[6].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Eighth player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-1/3">
          <img
            src={players[7].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
        {/* Nineth player */}
        <div className="w-10 h-10 rounded-full absolute right-4 top-2/3">
          <img
            src={players[8].user?.image ?? ''}
            className="w-10 h-10 rounded-full absolute z-20"
          />
          <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Fist player */}
      <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-0">
        <img
          src={players[0].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Second player */}
      <div className="w-10 h-10 rounded-full absolute left-1/4 bottom-8 md:bottom-0">
        <img
          src={players[1].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Third player */}
      <div className="w-10 h-10 rounded-full absolute left-4 top-2/3">
        <img
          src={players[2].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Fourth player */}
      <div className="w-10 h-10 rounded-full absolute left-4 top-1/3">
        <img
          src={players[3].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Fifth player */}
      <div className="w-10 h-10 rounded-full absolute left-1/4 top-10 md:top-0">
        <img
          src={players[4].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Sixth player */}
      <div className="w-10 h-10 rounded-full absolute left-1/2 -translate-x-1/2 top-10 md:top-0">
        <img
          src={players[5].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Seventh player */}
      <div className="w-10 h-10 rounded-full absolute right-1/4 top-10 md:top-0">
        <img
          src={players[6].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Eighth player */}
      <div className="w-10 h-10 rounded-full absolute right-4 top-1/3">
        <img
          src={players[7].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Ninth player */}
      <div className="w-10 h-10 rounded-full absolute right-4 top-2/3">
        <img
          src={players[8].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
      {/* Tenth player */}
      <div className="w-10 h-10 rounded-full absolute right-1/4 bottom-8 md:bottom-0">
        <img
          src={players[9].user?.image ?? ''}
          className="w-10 h-10 rounded-full absolute z-20"
        />
        <div className="absolute w-full h-full bg-[#FFDE99] rounded-full blur-md"></div>
      </div>
    </>
  )
}
