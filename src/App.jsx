import { useState } from 'react'
import axios from 'axios'

function App() {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    ctc: '',
    location: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A'
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    if (!formData.company.trim()) {
      setError('Please enter a company name')
      return
    }
    if (!formData.position.trim()) {
      setError('Please enter a job role/position')
      return
    }
    if (!formData.ctc.trim()) {
      setError('Please enter Annual CTC')
      return
    }
    if (!formData.location.trim()) {
      setError('Please enter work location')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/salary`, {
        company: formData.company.trim(),
        position: formData.position.trim(),
        ctc: formData.ctc.trim(),
        location: formData.location.trim()
      })

      setResult(response.data)
    } catch (err) {
      console.error('API Error:', err);
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to server. Please make sure the backend server is running on port 5000.');
      } else {
        setError(
          err.response?.data?.error ||
          err.message ||
          'Failed to calculate salary breakdown. Please try again.'
        );
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-4 py-8 min-h-screen">
        <div className="w-full max-w-6xl">
          {/* Hero Section with GIF */}
          <div className="mb-12 animate-fade-in">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-6">
              {/* GIF Image */}
              <div className="flex-shrink-0">
                <img
                  src="/tenor.gif"
                  alt="Money Animation"
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain rounded-2xl shadow-2xl shadow-purple-500/20 hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Title and Description */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-purple-300 mb-4 animate-gradient text-shadow-glow">
                  💰 CTC to In-Hand Calculator
                </h1>
                <p className="text-purple-200 text-lg md:text-xl max-w-2xl">
                  Calculate your detailed monthly salary breakdown with all deductions
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="mb-8 animate-slide-up">
            <div className="glass-card-purple rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g., TCS, Amazon, Google"
                    className="w-full px-4 py-3 md:py-4 input-purple rounded-xl text-base md:text-lg"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">
                    Job Role/Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g., SDE 1, Associate, Analyst"
                    className="w-full px-4 py-3 md:py-4 input-purple rounded-xl text-base md:text-lg"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">
                    Annual CTC *
                  </label>
                  <input
                    type="text"
                    name="ctc"
                    value={formData.ctc}
                    onChange={handleChange}
                    placeholder="e.g., 15,00,000 or 15 LPA"
                    className="w-full px-4 py-3 md:py-4 input-purple rounded-xl text-base md:text-lg"
                    disabled={loading}
                    required
                  />
                </div>
                <div>
                  <label className="block text-purple-200 text-sm font-semibold mb-2">
                    Work Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Bangalore, Mumbai, Delhi"
                    className="w-full px-4 py-3 md:py-4 input-purple rounded-xl text-base md:text-lg"
                    disabled={loading}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 btn-primary-purple disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/30 min-h-[44px]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  'Calculate Salary Breakdown'
                )}
              </button>
            </div>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="glass-card-purple border-2 border-red-500/50 rounded-2xl p-6 mb-6 animate-fade-in">
              <div className="flex items-start gap-3">
                <span className="text-3xl">❌</span>
                <p className="text-red-300 text-lg flex-1">{error}</p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && !loading && (
            <div className="glass-card-purple rounded-2xl p-6 md:p-8 shadow-2xl animate-slide-up">
              {/* Mismatch Warning */}
              {result.status === 'mismatch' && (
                <div className="mb-6">
                  <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl md:text-4xl">⚠️</span>
                      <div className="flex-1">
                        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-4">
                          Reality Check Failed
                        </h2>

                        {/* Mobile: Stacked Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-sm mb-4">
                          <div className="bg-purple-900/30 rounded-lg p-3">
                            <span className="text-purple-300 text-xs">Company:</span>
                            <p className="text-white font-medium">{result.company}</p>
                          </div>
                          <div className="bg-purple-900/30 rounded-lg p-3">
                            <span className="text-purple-300 text-xs">Position:</span>
                            <p className="text-white font-medium">{result.position}</p>
                          </div>
                          <div className="bg-purple-900/30 rounded-lg p-3">
                            <span className="text-purple-300 text-xs">CTC:</span>
                            <p className="text-white font-medium">{result.ctc}</p>
                          </div>
                          <div className="bg-purple-900/30 rounded-lg p-3">
                            <span className="text-purple-300 text-xs">Location:</span>
                            <p className="text-white font-medium">{result.location}</p>
                          </div>
                        </div>

                        <p className="text-yellow-200 leading-relaxed">
                          {result.analysis}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Salary Breakdown */}
              {result.status !== 'mismatch' && result.research_findings && (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-violet-300 mb-6">
                      💼 Compensation Research
                    </h2>

                    {/* Mobile: Stacked Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-sm mb-6">
                      <div className="bg-purple-900/30 rounded-lg p-3">
                        <span className="text-purple-300 text-xs">Company:</span>
                        <p className="text-white font-medium">{result.company}</p>
                      </div>
                      <div className="bg-purple-900/30 rounded-lg p-3">
                        <span className="text-purple-300 text-xs">Position:</span>
                        <p className="text-white font-medium">{result.position}</p>
                      </div>
                      <div className="bg-purple-900/30 rounded-lg p-3">
                        <span className="text-purple-300 text-xs">Total CTC:</span>
                        <p className="text-white font-medium">{result.ctc}</p>
                      </div>
                      <div className="bg-purple-900/30 rounded-lg p-3">
                        <span className="text-purple-300 text-xs">Location:</span>
                        <p className="text-white font-medium">{result.location}</p>
                      </div>
                    </div>

                    {/* Research Findings */}
                    <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-xl p-4 md:p-6 mb-6">
                      <h3 className="text-lg md:text-xl font-semibold text-cyan-300 mb-3">🔍 Research Findings</h3>
                      <p className="text-cyan-100 mb-4 leading-relaxed">{result.research_findings.company_policy}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-900/30 rounded-lg p-4 hover:bg-purple-900/40 transition-colors">
                          <span className="text-purple-300 text-sm block mb-1">Estimated Base Salary (Cash)</span>
                          <p className="text-white font-bold text-xl md:text-2xl">
                            {formatCurrency((result.research_findings.estimated_base_salary || 0) * 100000 / 12)}
                          </p>
                          <span className="text-purple-400 text-xs">
                            {result.research_findings.estimated_base_salary} LPA
                          </span>
                        </div>
                        <div className="bg-purple-900/30 rounded-lg p-4 hover:bg-purple-900/40 transition-colors">
                          <span className="text-purple-300 text-sm block mb-1">Stock Component (RSU)</span>
                          <p className="text-white font-bold text-xl md:text-2xl">
                            {formatCurrency((result.research_findings.estimated_stock_component || 0) * 100000 / 12)}
                          </p>
                          <span className="text-purple-400 text-xs">
                            {result.research_findings.estimated_stock_component} LPA (vested annually)
                          </span>
                        </div>
                        <div className="bg-purple-900/30 rounded-lg p-4 hover:bg-purple-900/40 transition-colors">
                          <span className="text-purple-300 text-sm block mb-1">Year-end Bonus</span>
                          <p className="text-white font-bold text-xl md:text-2xl">
                            {formatCurrency((result.research_findings.estimated_bonus || 0) * 100000 / 12)}
                          </p>
                          <span className="text-purple-400 text-xs">
                            {result.research_findings.estimated_bonus} LPA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Breakdown */}
                  {result.monthly_breakdown && (
                    <div className="mb-6">
                      <h3 className="text-xl md:text-2xl font-semibold text-purple-200 mb-4">💵 Monthly Cash Breakdown</h3>
                      <div className="bg-gradient-to-r from-purple-900/40 to-violet-900/40 rounded-xl p-4 md:p-6 mb-6 border border-purple-500/30">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <span className="text-purple-200 text-base md:text-lg">Gross Monthly Cash (Base Salary / 12):</span>
                          <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
                            {formatCurrency(result.monthly_breakdown.gross_monthly_cash)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Deductions Section */}
              {result.status !== 'mismatch' && result.monthly_breakdown && (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-purple-200 mb-4">📉 Monthly Deductions</h3>

                    {/* Desktop: Table View */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-purple-700/50">
                            <th className="pb-3 text-purple-300 font-semibold">Deduction</th>
                            <th className="pb-3 text-purple-300 font-semibold text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                          <tr className="border-b border-purple-700/30 hover:bg-purple-900/20 transition-colors">
                            <td className="py-3">PF (Provident Fund)</td>
                            <td className="py-3 text-right">{formatCurrency(result.monthly_breakdown.deductions?.pf)}</td>
                          </tr>
                          <tr className="border-b border-purple-700/30 hover:bg-purple-900/20 transition-colors">
                            <td className="py-3">Tax (TDS - Monthly)</td>
                            <td className="py-3 text-right">{formatCurrency(result.monthly_breakdown.deductions?.tax_monthly)}</td>
                          </tr>
                          <tr className="border-b border-purple-700/30 hover:bg-purple-900/20 transition-colors">
                            <td className="py-3">Professional Tax</td>
                            <td className="py-3 text-right">{formatCurrency(result.monthly_breakdown.deductions?.professional_tax)}</td>
                          </tr>
                          {result.monthly_breakdown.deductions?.esi && (
                            <tr className="border-b border-purple-700/30 hover:bg-purple-900/20 transition-colors">
                              <td className="py-3">ESI (Employee State Insurance)</td>
                              <td className="py-3 text-right">{formatCurrency(result.monthly_breakdown.deductions.esi)}</td>
                            </tr>
                          )}
                          {result.monthly_breakdown.deductions?.other_deductions && (
                            <tr className="border-b border-purple-700/30 hover:bg-purple-900/20 transition-colors">
                              <td className="py-3">Other Deductions</td>
                              <td className="py-3 text-right">{formatCurrency(result.monthly_breakdown.deductions.other_deductions)}</td>
                            </tr>
                          )}
                          <tr className="border-t-2 border-purple-600">
                            <td className="py-3 font-semibold">Total Deductions</td>
                            <td className="py-3 text-right font-semibold text-red-400">
                              {formatCurrency(
                                (result.monthly_breakdown.deductions?.pf || 0) +
                                (result.monthly_breakdown.deductions?.tax_monthly || 0) +
                                (result.monthly_breakdown.deductions?.professional_tax || 0) +
                                (result.monthly_breakdown.deductions?.esi || 0) +
                                (result.monthly_breakdown.deductions?.other_deductions || 0)
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile: Card View */}
                    <div className="md:hidden space-y-3">
                      <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/30">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200">PF (Provident Fund)</span>
                          <span className="text-white font-semibold">{formatCurrency(result.monthly_breakdown.deductions?.pf)}</span>
                        </div>
                      </div>
                      <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/30">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200">Tax (TDS - Monthly)</span>
                          <span className="text-white font-semibold">{formatCurrency(result.monthly_breakdown.deductions?.tax_monthly)}</span>
                        </div>
                      </div>
                      <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/30">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200">Professional Tax</span>
                          <span className="text-white font-semibold">{formatCurrency(result.monthly_breakdown.deductions?.professional_tax)}</span>
                        </div>
                      </div>
                      {result.monthly_breakdown.deductions?.esi && (
                        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/30">
                          <div className="flex justify-between items-center">
                            <span className="text-purple-200">ESI</span>
                            <span className="text-white font-semibold">{formatCurrency(result.monthly_breakdown.deductions.esi)}</span>
                          </div>
                        </div>
                      )}
                      {result.monthly_breakdown.deductions?.other_deductions && (
                        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/30">
                          <div className="flex justify-between items-center">
                            <span className="text-purple-200">Other Deductions</span>
                            <span className="text-white font-semibold">{formatCurrency(result.monthly_breakdown.deductions.other_deductions)}</span>
                          </div>
                        </div>
                      )}
                      <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 rounded-lg p-4 border-2 border-red-500/50">
                        <div className="flex justify-between items-center">
                          <span className="text-red-200 font-semibold">Total Deductions</span>
                          <span className="text-red-400 font-bold text-lg">
                            {formatCurrency(
                              (result.monthly_breakdown.deductions?.pf || 0) +
                              (result.monthly_breakdown.deductions?.tax_monthly || 0) +
                              (result.monthly_breakdown.deductions?.professional_tax || 0) +
                              (result.monthly_breakdown.deductions?.esi || 0) +
                              (result.monthly_breakdown.deductions?.other_deductions || 0)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final In-Hand Salary */}
                  <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/30 to-green-900/30 border-2 border-green-500/50 rounded-xl p-6 md:p-8 shadow-lg shadow-green-500/20">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <span className="text-xl md:text-2xl font-semibold text-green-200">✨ Final Monthly In-Hand Salary:</span>
                      <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                        {formatCurrency(result.monthly_breakdown.final_in_hand_salary)}
                      </span>
                    </div>
                    <p className="text-sm text-green-200/80 mt-3 italic">
                      * Based on Base Salary only. Stock components and bonuses are paid separately.
                    </p>
                  </div>

                  {result.notes && (
                    <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-xl">
                      <p className="text-sm text-yellow-200">{result.notes}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
