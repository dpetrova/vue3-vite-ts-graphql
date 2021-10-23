import { ref, computed } from 'vue'
import { Ref } from '../types'

export default function (rating: Ref<number> | number) {
  const getStarName = (rate: number) => {
    const receivedRating = typeof rating === 'object' ? rating.value : rating  
    if (rate <= receivedRating) {
      return 'star'
    }
    if (Math.fround(rate - receivedRating) < 1) {
      return 'star_half'
    }
    return 'star_border'
  }

  return {
    getStarName,
  }
}

// export default function (rating: any) {
//   const getStarName = (rate: number) => {    
//     const receivedRating = rating.value | rating  
//     if (rate <= receivedRating) {
//       return 'star'
//     }
//     if (Math.fround(rate - receivedRating) < 1) {
//       return 'star_half'
//     }
//     return 'star_border'
//   }

//   return {
//     getStarName,
//   }
// }