-- Users are managed by Clerk, synced via webhook
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    avatar_url TEXT,
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'free',
    ai_generations_used INTEGER DEFAULT 0,
    ai_generations_reset_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    source_type TEXT,
    question_count INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    results JSONB NOT NULL,
    skipped_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_quizzes_user_id ON quizzes(user_id);
CREATE INDEX idx_quizzes_is_public ON quizzes(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Users: can read/update own row
CREATE POLICY "Users can read own data" ON users
    FOR SELECT USING (id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Quizzes: owner full access, public quizzes readable by all
CREATE POLICY "Users can CRUD own quizzes" ON quizzes
    FOR ALL USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Public quizzes are readable" ON quizzes
    FOR SELECT USING (is_public = TRUE);

-- Quiz attempts: owner full access
CREATE POLICY "Users can CRUD own attempts" ON quiz_attempts
    FOR ALL USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');
