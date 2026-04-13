import re
from typing import Optional

_INJECTION_PATTERNS = [
    r"ignore\s+(previous|above|all)\s+instructions?",
    r"act\s+as\s+(if\s+you\s+(are|were)|a|an)\s+",
    r"forget\s+(your|the)\s+(role|instructions?|prompt|context|rules)",
    r"\byou\s+are\s+now\b",
    r"\bdisregard\b.{0,30}\binstructions?\b",
    r"\bnew\s+persona\b",
    r"pretend\s+(you\s+are|to\s+be)",
    r"override\s+(your|the)\s+(instructions?|prompt|system)",
    r"\bjailbreak\b",
    r"\bDAN\b",
]

_SENSITIVE_OUTPUT_PATTERNS = [
    r"\+\d[\d\s\-\(\)\.]{7,}",  # phone numbers (international)
]

_COMPILED_INJECTION = [re.compile(p, re.IGNORECASE) for p in _INJECTION_PATTERNS]
_COMPILED_SENSITIVE = [re.compile(p, re.IGNORECASE) for p in _SENSITIVE_OUTPUT_PATTERNS]


def check_input(question: str) -> Optional[str]:
    """Return error string if input violates guardrails, None if clean."""
    for pattern in _COMPILED_INJECTION:
        if pattern.search(question):
            return "That type of question is not allowed."
    return None


def sanitize_output(answer: str) -> str:
    """Strip sensitive PII from model output."""
    for pattern in _COMPILED_SENSITIVE:
        answer = pattern.sub("[redacted]", answer)
    return answer
