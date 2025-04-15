import { format, parseISO } from "date-fns";

type DateTimeProps = {
  value: string;
} & React.ComponentProps<"time">;

const DateTime = (props: DateTimeProps) => {
  const { value, ...rest } = props;

  return (
    <time dateTime={value} {...rest}>
      {format(parseISO(value), "MMMM d, yyyy")}
    </time>
  );
};

export default DateTime;
