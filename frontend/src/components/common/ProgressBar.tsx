interface ProgressBarProps {
  value: number
  max: number
  className?: string
}

const ProgressBar = ({ value, max, className = '' }: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={`progress ${className}`}>
      <div
        className="progress-fill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

export default ProgressBar
