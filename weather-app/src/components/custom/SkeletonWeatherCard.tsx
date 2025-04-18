import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const SkeletonWeatherCard = () => {
  return (
    <div
      data-testid="skeleton-weather-card"
      className="flex p-6 h-screen w-screen items-center justify-center"
    >
      <Card className="w-full max-w-[500px] border-none">
        <CardHeader>
          <Skeleton className="h-10 w-full rounded-md" /> {/* SearchBar */}
          <CardTitle>
            <Skeleton className="h-5 w-2/3 mx-auto" /> {/* Location */}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className="flex items-center justify-between gap-4 ">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-16 h-16 rounded-full" />{" "}
              {/* Weather Icon */}
              <Skeleton className="h-4 w-24" /> {/* Description */}
            </div>
            <Skeleton className="h-10 w-20" /> {/* Temperature */}
            <div className="space-y-2 text-sm text-right">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-20 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
};
