import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `AI-Powered Resume Optimization`,
      description: `Our advanced AI analyzes and optimizes your resume to pass ATS systems while maintaining a human touch that recruiters love.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Smart Keyword Matching`,
      description: `Automatically match your skills and experience with job descriptions to increase your interview chances by up to 70%.`,
      icon: <i className="las la-search"></i>,
    },
    {
      heading: `LinkedIn Profile Enhancement`,
      description: `Get discovered by top recruiters with an AI-optimized LinkedIn profile that highlights your professional brand.`,
      icon: <i className="lab la-linkedin"></i>,
    },
    {
      heading: `Custom Cover Letters`,
      description: `Generate tailored cover letters in seconds that showcase your unique value proposition for each application.`,
      icon: <i className="las la-file-alt"></i>,
    },
    {
      heading: `Multi-Language Support`,
      description: `Expand your job search globally with professional resume translations and region-specific formatting.`,
      icon: <i className="las la-language"></i>,
    },
    {
      heading: `Real-Time Analytics`,
      description: `Track your application performance and get actionable insights to improve your success rate.`,
      icon: <i className="las la-chart-line"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `Software Engineer`,
      content: `After using the AI Resume Optimizer, I landed interviews at 3 FAANG companies. The keyword optimization made all the difference!`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `James Wilson`,
      designation: `Marketing Director`,
      content: `The LinkedIn optimization feature helped me get headhunted for my dream role. My profile views increased by 400% in just two weeks.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Maria Garcia`,
      designation: `Recent Graduate`,
      content: `As a fresh graduate, I was struggling to get noticed. This tool helped me optimize my resume and I got my first job within a month!`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Essential`,
      description: `Perfect for active job seekers`,
      monthly: 29,
      yearly: 290,
      features: [
        `AI Resume Optimization`,
        `Basic Keyword Matching`,
        `Cover Letter Generator`,
      ],
    },
    {
      title: `Professional`,
      description: `For serious career advancement`,
      monthly: 49,
      yearly: 490,
      features: [
        `Everything in Essential`,
        `LinkedIn Profile Optimization`,
        `Priority Support`,
        `Advanced Analytics`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Complete career transformation`,
      monthly: 99,
      yearly: 990,
      features: [
        `Everything in Professional`,
        `Multi-Language Support`,
        `1-on-1 Career Coaching`,
        `Executive Resume Services`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How does the AI resume optimization work?`,
      answer: `Our AI analyzes your resume against industry standards and job requirements, suggesting improvements for both ATS compatibility and human readability.`,
    },
    {
      question: `Will my resume still sound natural after AI optimization?`,
      answer: `Absolutely! Our AI maintains your authentic voice while optimizing for keywords and readability.`,
    },
    {
      question: `How quickly can I see results?`,
      answer: `Most users see increased interview invitations within 2-3 weeks of implementing our optimization suggestions.`,
    },
    {
      question: `Can I use this for multiple job applications?`,
      answer: `Yes! You can create unlimited versions of your resume optimized for different positions and industries.`,
    },
  ]

  const steps = [
    {
      heading: `Upload Your Resume`,
      description: `Simply upload your current resume in any format.`,
    },
    {
      heading: `AI Analysis`,
      description: `Our AI analyzes your resume against industry standards and job requirements.`,
    },
    {
      heading: `Optimize Content`,
      description: `Implement suggested improvements for maximum impact.`,
    },
    {
      heading: `Track Success`,
      description: `Monitor your application success rate and keep optimizing.`,
    },
  ]

  const painPoints = [
    {
      emoji: `😔`,
      title: `Sending countless applications with no response`,
    },
    {
      emoji: `😤`,
      title: `Getting rejected by ATS before reaching human recruiters`,
    },
    {
      emoji: `😩`,
      title: `Watching less qualified candidates land interviews`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Land Your Dream Job with AI-Powered Resume Optimization`}
        subtitle={`Stop getting filtered out by ATS systems. Start getting more interviews with our AI-powered career optimization suite that helps you stand out in today's competitive job market.`}
        buttonText={`Start Optimizing Now`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/KOEQ1V-airesumeandcareer-6pJI`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={25000}
            suffixText={`successful job seekers`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Leading Companies`} />
      <LandingPainPoints
        title={`75% of Qualified Candidates Never Make it Past ATS Systems - Don't Be One of Them`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to Career Success`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Transform Your Job Search with AI-Powered Tools`}
        subtitle={`Get the competitive edge you need with our comprehensive suite of career optimization features`}
        features={features}
      />
      <LandingTestimonials
        title={`Join Thousands of Successful Job Seekers`}
        subtitle={`See how our AI-powered platform has transformed careers`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Your Career Success`}
        subtitle={`Choose the plan that matches your career goals`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About AI Resume Optimization`}
        subtitle={`Everything you need to know about boosting your career with AI`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Job Search?`}
        subtitle={`Join thousands of successful professionals who've already optimized their career materials with AI`}
        buttonText={`Get Started Now`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
