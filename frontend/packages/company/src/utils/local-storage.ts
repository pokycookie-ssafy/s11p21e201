export function localStorageAvailable() {
  try {
    const key = 'C921F62B8CE73B65ACA959BD539EE'
    window.localStorage.setItem(key, key)
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}

export function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable()

  if (storageAvailable) {
    return localStorage.getItem(key) || defaultValue
  }
  return defaultValue
}
