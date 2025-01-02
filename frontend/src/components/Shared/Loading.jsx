import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[51]">
      <ReactLoading type={"spin"} color={"rgb(116 148 253)"} height={"100px"} width={"100px"} />
    </div>
  );
}

export default Loading;
