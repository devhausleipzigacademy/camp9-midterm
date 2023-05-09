import React from 'react';
import { createContext } from 'react';

export const SeatsContext = createContext({
  seatObject: {
    frontSeatsCount: 0,
    middleSeatsCount: 0,
    backSeatsCount: 0,
    seatIds: []
  },
  setSeatObject: React.Dispatch<React.SetStateAction<{
    front: number;
    middle: number;
    back: number;
}>> 
});