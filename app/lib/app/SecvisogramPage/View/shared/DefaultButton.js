/**
 * @param {React.DetailedHTMLProps<
 *   React.ButtonHTMLAttributes<HTMLButtonElement>,
 *   HTMLButtonElement>
 * } props
 */
export default function DefaultButton(props) {
  return (
    <button
      className="border border-gray-400 py-1 px-2 hover:bg-gray-200 rounded"
      type="button"
      {...props}
    />
  )
}
