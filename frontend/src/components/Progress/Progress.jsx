import { Progress } from 'antd';

function ProgressBar({ currentUserReview }) {

  const progressValue = (key) => {
    switch (key) {
      case 0:
        return 15

      case 1:
        return 30

      case 2:
        return 40

      case 3:
        return 55

      case 4:
        return 70

      case 5:
        return 85

      default:
        return 100
    }
  }

  return (
    <div className='progress' style={{position: 'absolute', zIndex: '-1'}}>
      <Progress
        type="circle"
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        width='284px'
        percent={progressValue(currentUserReview.length)}
      />
    </div>
  )
}

export default ProgressBar
