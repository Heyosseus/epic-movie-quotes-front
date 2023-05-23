import { defineRule } from 'vee-validate'
import { required, email, min, max, alpha } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('alpha', alpha)

defineRule('lowercase', (value) => {
  if (!/^[a-z]+$/.test(value)) {
    return 'This field must be lowercase'
  }
  return true
})
defineRule('confirmed', (value, [target]) => {
  if (value !== target) {
    return 'This field confirmation does not match'
  }
  return true
})
