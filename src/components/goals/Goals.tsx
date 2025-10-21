import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function Goals() {
  return (
    <Card className="my-4 w-full gap-2">
      <CardHeader>
        <CardTitle className="underline">Your Active Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            <span className="italic">Long-term Goal:</span> Break into a
            big-tech or high profile startup.
          </li>
          <li>
            <span className="italic">Short-term Goal:</span> Built and app using
            Next.js and Postgres.
          </li>
          <li>
            <span className="italic">Daily Goal:</span> Do 3 leetcode problems
            minimum.
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
