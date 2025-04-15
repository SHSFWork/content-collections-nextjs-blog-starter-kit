import CopyButton from "@/components/copy-button";

type Props = {
  __rawString__?: string;
  ["data-language"]?: string;
} & React.HTMLProps<HTMLPreElement>;

const Pre = ({
  __rawString__ = "",
  ["data-language"]: dataLanguage = "Shell",
  children,
  ...rest
}: Props) => {
  return (
    <pre
      className="rounded-xl bg-neutral-800 relative overflow-hidden p-[0.5rem] shadow-smooth"
      {...rest}
    >
      <div className="flex items-center justify-between">
        <p className="capitalize text-xs text-white">{dataLanguage}</p>
        <CopyButton text={__rawString__} />
      </div>
      {children}
    </pre>
  );
};

export default Pre;
