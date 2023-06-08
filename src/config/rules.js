import { defineRule } from 'vee-validate'
import { required, email, min, max, alpha, min_value, max_value } from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('min_for_name', min)
defineRule('max', max)
defineRule('alpha', alpha)
defineRule('min_value', min_value)
defineRule('max_value', max_value)

defineRule('lowercase', (value) => {
  if (!/^[a-z]+$/.test(value)) {
    return 'This field must be lowercase'
  }
  return true
})

defineRule('confirmed', (value, [target]) => {
  if (value !== target) {
    return 'confirmation does not match'
  }
  return true
})
defineRule('update_confirmed', (value, [target]) => {
  if (value !== target) {
    return 'confirmation does not match'
  }
  return true
})
