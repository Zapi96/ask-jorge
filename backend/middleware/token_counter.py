import tiktoken

_enc = tiktoken.get_encoding("cl100k_base")


def count_tokens(text: str) -> int:
    """Count tokens using cl100k_base (good approximation for Llama tokenizers)."""
    return len(_enc.encode(text))
