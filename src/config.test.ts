import { optionsToConfig } from './config'
import { isComment, isDocumentFragment, isText } from './util'

const text = document.createTextNode('text')
const span = document.createElement('SPAN')
const div = document.createElement('DIV')
const video = document.createElement('VIDEO')
const comment = document.createComment('comment')
const fragment = document.createDocumentFragment()

describe('skipChildren', () => {
    describe('without options', () => {
        const config = optionsToConfig()
        test('return true given a text node', () => {
            expect(config.skipChildren(text)).toBe(true)
        })
        test('return true given a comment node', () => {
            expect(config.skipChildren(comment)).toBe(true)
        })
        test('return false given a SPAN', () => {
            expect(config.skipChildren(span)).toBe(false)
        })
        test('return true given a VIDEO', () => {
            expect(config.skipChildren(video)).toBe(true)
        })
        test('return false given a DIV', () => {
            expect(config.skipChildren(div)).toBe(false)
        })
        test('return false given a document fragment', () => {
            expect(config.skipChildren(fragment)).toBe(false)
        })
    })
    describe('with options', () => {
        const config = optionsToConfig({
            skipChildren(node: Node): boolean | undefined {
                return node.nodeName === 'SPAN'
                    ? true
                    : node.nodeName === 'VIDEO'
                    ? false
                    : isText(node) || isComment(node)
                    ? false
                    : isDocumentFragment(node)
                    ? true
                    : undefined
            }
        })
        test('return true given a text node', () => {
            expect(config.skipChildren(text)).toBe(true)
        })
        test('return true given a comment node', () => {
            expect(config.skipChildren(comment)).toBe(true)
        })
        test('return true given a SPAN', () => {
            expect(config.skipChildren(span)).toBe(true)
        })
        test('return false given a VIDEO', () => {
            expect(config.skipChildren(video)).toBe(false)
        })
        test('return false given a DIV', () => {
            expect(config.skipChildren(div)).toBe(false)
        })
        test('return true given a document fragment', () => {
            expect(config.skipChildren(fragment)).toBe(true)
        })
    })
})

describe('skipSelf', () => {
    describe('without options', () => {
        const config = optionsToConfig()
        test('return false given a text node', () => {
            expect(config.skipSelf(text)).toBe(false)
        })
        test('return true given a comment node', () => {
            expect(config.skipSelf(comment)).toBe(true)
        })
        test('return true given a SPAN', () => {
            expect(config.skipSelf(span)).toBe(true)
        })
        test('return false given a VIDEO', () => {
            expect(config.skipSelf(video)).toBe(false)
        })
        test('return false given a DIV', () => {
            expect(config.skipSelf(div)).toBe(false)
        })
        test('return true given a document fragment', () => {
            expect(config.skipSelf(fragment)).toBe(true)
        })
    })
    describe('with options', () => {
        const config = optionsToConfig({
            skipSelf(node: Node): boolean | undefined {
                return isText(node)
                    ? true
                    : isComment(node)
                    ? false
                    : isDocumentFragment(node)
                    ? false
                    : node.nodeName === 'SPAN'
                    ? false
                    : node.nodeName === 'VIDEO'
                    ? true
                    : undefined
            }
        })
        test('return true given a text node', () => {
            expect(config.skipSelf(text)).toBe(true)
        })
        test('return true given a comment node', () => {
            expect(config.skipSelf(comment)).toBe(true)
        })
        test('return false given a SPAN', () => {
            expect(config.skipSelf(span)).toBe(false)
        })
        test('return true given a VIDEO', () => {
            expect(config.skipSelf(video)).toBe(true)
        })
        test('return false given a DIV', () => {
            expect(config.skipSelf(div)).toBe(false)
        })
        test('return true given a document fragment', () => {
            expect(config.skipSelf(fragment)).toBe(true)
        })
    })
})