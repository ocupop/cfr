import { atom } from 'recoil'

const activeCountry = atom({
  key: "activeCountry",
  default: "CA"
})


export { activeCountry }