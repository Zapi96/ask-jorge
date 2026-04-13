from middleware.token_counter import count_tokens


def test_short_text_under_limit():
    assert count_tokens("Hello, who is Jorge?") < 20


def test_empty_string():
    assert count_tokens("") == 0


def test_long_text_over_200():
    long_text = "word " * 300
    assert count_tokens(long_text) > 200
