import { QRCodeSVG } from 'qrcode.react';
import { Link, useParams } from 'react-router-dom';
import { MovieDetailDbResponse } from '../utilities/types';
import useQuery from '../hooks/useQuery';
import Button from '../components/Button';

function Ticket() {
  // const { id } = useParams();
  const id = 502356; //Mock as SuperMario. please change to useParams() when you are ready to test

  const { data, isLoading } = useQuery<MovieDetailDbResponse>(
    `https://api.themoviedb.org/3/movie/${id}?api_key=7bdc02c5d27a184488dd56b87a8cad76&language=en-US&append_to_response=credits`
  );

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-5">
      {/* This div holds the ticket and the button. the flex makes the ticket responsive to different phones */}
      <div className=" grow grid w-full content-between bg-[#494952] rounded-[12px] items-center">
        {/* This div holds the ticket information and the "grow" is making the ticket responsive */}
        <div>
          {/* This div holds the movie poster and the movie information. it is needed in order to place the poster and the data together */}
          <img
            src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
            alt="Movie Poster"
            className="  rounded-t-[12px]  object-cover w-full h-[160px]"
          />
          <div className="grid">
            {/* This grid holds the Ticket information */}
            <h2 className="typography-title pt-2 pb-6 px-6">{data.title}</h2>
            <div className="flex justify-between px-6 ">
              {/* This div holds the Date, Time, Price zusammen. It does not include Seats */}
              <div className="grid">
                <span className="text-xs font-medium">Date</span>
                <p className="font-semibold text-white">08 jan</p>
              </div>
              <div className="grid">
                <span className="text-xs font-medium">Time</span>
                <p className="font-semibold text-white">12:30</p>
              </div>
              <div className="grid">
                <span className="text-xs font-medium">Price</span>
                <p className="font-semibold text-white">56,00</p>
              </div>
            </div>
            <div className="grid pt-2 px-6">
              <span className="text-xs font-medium">Seats</span>
              <p className="font-semibold text-white">c-3,c-4,c-5</p>
            </div>
          </div>
        </div>
        <div>
          {/* This div puts the barcode, the line and the circle in the end of the ticket. */}
          <hr className="translate-y-8 border-dashed" />
          <div className="flex justify-between items-center">
            {/* This div holds the circles in the end of the ticket */}
            <span className="-translate-x-6 translate-y-2.5 w-12 h-12 rounded-full bg-dark"></span>
            <span className="translate-x-6 translate-y-2.5 w-12 h-12 rounded-full bg-dark"></span>
          </div>
          <div className="flex justify-center pb-3">
            <QRCodeSVG value={`name:x;date:y;time:z;movieId:a;seats:b;price:c;`} />
          </div>
        </div>
      </div>
      <div className="w-full pt-5">
        <Link to="/">
          <Button>Back To Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default Ticket;
