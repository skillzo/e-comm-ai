interface LoadMoreProps {
  showing: number;
  total: number;
}

export default function LoadMore({ showing, total }: LoadMoreProps) {
  return (
    <div className="mt-20 text-center">
      <p className="text-sm text-gray-500 mb-4">
        Showing {showing} of {total} items
      </p>
      <div className="w-64 h-1 bg-gray-200 mx-auto rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-primary w-1/12 rounded-full"></div>
      </div>
      <button className="bg-primary text-white hover:bg-gray-800 px-8 py-3 font-bold uppercase tracking-wide text-sm rounded-full transition-colors">
        Load More
      </button>
    </div>
  );
}

