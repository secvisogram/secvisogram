/**
 * @param {{
   label: string
  }} props
 */
export default function LoadingIndicator({ label }) {
  return (
    <div
      className="fixed top-0 bottom-0 right-0 left-0"
      data-testid="loading_indicator"
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-70" />
      <div className="relative z-10 py-4 mx-auto text-center">
        <div className="text-white pb-2">{label}</div>
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
