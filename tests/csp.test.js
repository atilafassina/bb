const { Type } = require('csp_evaluator/dist/finding')
const { CspEvaluator } = require('csp_evaluator/dist/evaluator')
const { CspParser } = require('csp_evaluator/dist/parser')

/**
 * CSP-EVALUATOR Finding types and severity
 * https://github.com/google/csp-evaluator/blob/e3638195ac812d61dc8ea11b5805e04e4230e2f6/finding.ts#L82-L116
 */

const CSPHeaders = require('../utils/csp')
const { describe } = require('jest-circus')

function getChecks(CSPValue) {
  const parsed = new CspParser(CSPValue).csp
  const evaluated = new CspEvaluator(parsed).evaluate()

  return evaluated
}

describe('Content Security Policy', () => {
  describe('syntax should be valid', () => {
    it('should not have any missing directives', () => {
      const checks = getChecks(CSPHeaders)

      expect(
        checks.every((finding) => {
          return finding.type !== Type.MISSING_DIRECTIVES
        })
      ).toBe(true)
    })

    it('should not have any missing directives', () => {
      const checks = getChecks(CSPHeaders)

      expect(
        checks.every((finding) => finding.type !== Type.UNKNOWN_DIRECTIVE)
      ).toEqual(true)
    })
  })

  it('should not have any deprecated directives', () => {
    const checks = getChecks(CSPHeaders)

    expect(
      checks.every((finding) => finding.type !== Type.DEPRECATED_DIRECTIVE)
    ).toEqual(true)
  })
})

describe('`report-uri`', () => {
  it('should have a report destination and a url', () => {
    const { directives } = new CspParser(CSPHeaders).csp

    console.log(process.env.SENTRY_CSP_REPORT_URI)

    expect(directives.hasOwnProperty('report-uri')).toEqual(true)
    expect(directives['report-uri'][0]).toMatch(
      process.env.SENTRY_CSP_REPORT_URI
    )
  })
})

describe('Security strictness', () => {
  it('should have enough severity', () => {
    const checks = getChecks(CSPHeaders)

    expect(checks.every((finding) => finding.severity >= 50)).toEqual(true)
  })
})
