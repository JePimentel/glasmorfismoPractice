let container = document.querySelector('.container')
const color = document.querySelector('#color')
const transparency = document.querySelector('#transparency')
const blurInput = document.querySelector('#blur')
const contrastInput = document.querySelector('#contrast')
const saturateInput = document.querySelector('#saturate')
const size = document.querySelector('#size')
const borderRadius = document.querySelector('#borderRadius')
let code

let blurText = 'blur(0px)'
let contrastText = 'contrast(1)'
let saturateText = 'saturate(1)'
let opacity = '1'
const colorDefault = '#000000'
container.style.backgroundColor = colorDefault
let colorSelected = colorDefault
let styles = {
    color: '',
    backdropFilter: '',
    size: '',
    radius: ''
}

const listenBackdropFilter = (filter) => {
    const filters = [blurText, contrastText, saturateText]

    if (filter.includes('blur') && filter != 'blur(0px)') {    
        filters[0] = filter
        if (filters[2] === 'saturate(1)') filters.splice(2, 1)
        if (filters[1] === 'contrast(1)') filters.splice(1, 1)
        
    } else if (filter.includes('contrast') && filter != 'contrast(1)'){
        filters[1] = filter
        if (filters[2] === 'saturate(1)') filters.splice(2, 1)
        if (filters[0] === 'blur(0px)') filters.splice(0, 1)
    } else if (filter.includes('saturate') && filter != 'saturate(1)') {  
        filters[2] = filter
        if (filters[1] === 'contrast(1)') filters.splice(1, 1)
        if (filters[0] === 'blur(0px)') filters.splice(0, 1)
    }
    styles.backdropFilter = filters.join('')
    return filters.join(' ')
}

const hexToRgba = (color, opacity) => {
    const hexToArray = color.split('')
    let r = `${hexToArray[1]}${hexToArray[2]}`
    let g = `${hexToArray[3]}${hexToArray[4]}`
    let b = `${hexToArray[5]}${hexToArray[6]}`
    return `
        rgba(${parseInt(r, 16)}, 
             ${parseInt(g, 16)}, 
             ${parseInt(b, 16)}, 
             ${opacity})
    `
}

const getSize = (size) => {
    let width = `${size}px`
    let height = `${size}px`
    return { width, height}
}

const getRadio = (radio) => {
    let borderRadius = `${radio}%`
    return { borderRadius }
}

const generateCode = () => {
    code = document.querySelector('.code')
    let colorCode = styles.color
    let backdrop = styles.backdropFilter
    let sizeCode = styles.size
    let radiusCode = styles.radius
    code.textContent = `
        .code {
            ${sizeCode != '' ? `width: ${sizeCode};` : ''}
            ${sizeCode != '' ? `height: ${sizeCode};` : ''}
            ${colorCode != '' ?  `background-color: ${colorCode};` : ''}
            ${backdrop != '' ? `backdrop-filter: ${backdrop.split('').join('')};` : ''}
            ${radiusCode != '' ? `border-radius: ${radiusCode};` : ''}
        }
    `
}

color.addEventListener('input', (e) => {
    styles.color = hexToRgba(e.target.value, opacity)
    generateCode()
    container.style.backgroundColor = hexToRgba(e.target.value, opacity)
    colorSelected = e.target.value
})

transparency.addEventListener('input', (e) => {
    styles.color = hexToRgba(colorSelected, e.target.value)
    generateCode()
    opacity = e.target.value
    container.style.backgroundColor = hexToRgba(colorSelected, e.target.value)
})

blurInput.addEventListener('input', (e) => {
    blurText = `blur(${e.target.value}px)`
    styles.backdropFilter = listenBackdropFilter(blurText)
    generateCode()
    container.style.backdropFilter = listenBackdropFilter(blurText)
})

contrastInput.addEventListener('input', (e) => {
    contrastText = `contrast(${e.target.value})`
    styles.backdropFilter = listenBackdropFilter(contrastText)
    generateCode()
    container.style.backdropFilter = listenBackdropFilter(contrastText)
})

saturateInput.addEventListener('input', (e) => {
    saturateText = `saturate(${e.target.value})`
    styles.backdropFilter = listenBackdropFilter(saturateText)
    generateCode()
    container.style.backdropFilter = listenBackdropFilter(saturateText)
})

size.addEventListener('input', (e) => {
    const { width, height } = getSize(e.target.value)
    styles.size = width
    generateCode()
    container.style.width = width
    container.style.height = height
})

borderRadius.addEventListener('input', (e) => {
    const { borderRadius } = getRadio(e.target.value)
    styles.radius = borderRadius
    generateCode()
    container.style.borderRadius = borderRadius
})