#!/usr/bin/env python3
"""CLI for converting text to speech with the ElevenLabs API."""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    load_dotenv = None

try:
    from elevenlabs.client import ElevenLabs
except ImportError:
    print(
        "Missing dependency: pip install elevenlabs python-dotenv",
        file=sys.stderr,
    )
    raise SystemExit(1)

DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"
DEFAULT_MODEL_ID = "eleven_multilingual_v2"
DEFAULT_OUTPUT_FORMAT = "mp3_44100_128"


def load_api_key(explicit_key: str | None) -> str:
    if explicit_key:
        return explicit_key

    if load_dotenv is not None:
        load_dotenv()

    api_key = os.getenv("ELEVENLABS_API_KEY")
    if not api_key:
        raise SystemExit(
            "Set ELEVENLABS_API_KEY or pass --api-key. "
            "Get a key at https://elevenlabs.io/app/settings/api-keys"
        )
    return api_key


def read_text(text: str | None, text_file: Path | None) -> str:
    if text and text_file:
        raise SystemExit("Use either positional text or --file, not both.")

    if text_file:
        if not text_file.is_file():
            raise SystemExit(f"File not found: {text_file}")
        content = text_file.read_text(encoding="utf-8").strip()
        if not content:
            raise SystemExit(f"File is empty: {text_file}")
        return content

    if text:
        content = text.strip()
        if not content:
            raise SystemExit("Text cannot be empty.")
        return content

    if sys.stdin.isatty():
        raise SystemExit("Provide text, --file, or pipe text on stdin.")

    content = sys.stdin.read().strip()
    if not content:
        raise SystemExit("No text received on stdin.")
    return content


def write_audio(audio, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("wb") as handle:
        for chunk in audio:
            handle.write(chunk)


def play_audio(output_path: Path) -> None:
    try:
        from elevenlabs.play import play
    except ImportError:
        raise SystemExit(
            "Playback requires PyAudio: pip install 'elevenlabs[pyaudio]'"
        )

    play(output_path.read_bytes())


def cmd_speak(args: argparse.Namespace) -> None:
    client = ElevenLabs(api_key=load_api_key(args.api_key))
    text = read_text(args.text, args.file)

    audio = client.text_to_speech.convert(
        text=text,
        voice_id=args.voice,
        model_id=args.model,
        output_format=args.format,
    )

    output_path = args.output
    if output_path is None:
        suffix = ".mp3" if args.format.startswith("mp3") else ".audio"
        output_path = Path.cwd() / f"speech{suffix}"

    write_audio(audio, output_path)
    print(f"Saved: {output_path}")

    if args.play:
        play_audio(output_path)


def cmd_voices(args: argparse.Namespace) -> None:
    client = ElevenLabs(api_key=load_api_key(args.api_key))
    response = client.voices.get_all()

    for voice in response.voices:
        labels = ", ".join(f"{key}={value}" for key, value in voice.labels.items())
        label_suffix = f" ({labels})" if labels else ""
        print(f"{voice.voice_id}\t{voice.name}{label_suffix}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Convert text to speech using the ElevenLabs API.",
    )
    parser.add_argument(
        "--api-key",
        help="ElevenLabs API key (default: ELEVENLABS_API_KEY env var)",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    speak = subparsers.add_parser("speak", help="Convert text to speech")
    speak.add_argument(
        "text",
        nargs="?",
        help="Text to speak (omit to read from stdin)",
    )
    speak.add_argument(
        "-f",
        "--file",
        type=Path,
        help="Read text from a file instead of an argument",
    )
    speak.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Output audio file (default: ./speech.mp3)",
    )
    speak.add_argument(
        "-v",
        "--voice",
        default=DEFAULT_VOICE_ID,
        help=f"Voice ID (default: {DEFAULT_VOICE_ID})",
    )
    speak.add_argument(
        "-m",
        "--model",
        default=DEFAULT_MODEL_ID,
        help=f"Model ID (default: {DEFAULT_MODEL_ID})",
    )
    speak.add_argument(
        "--format",
        default=DEFAULT_OUTPUT_FORMAT,
        help=f"Output format (default: {DEFAULT_OUTPUT_FORMAT})",
    )
    speak.add_argument(
        "-p",
        "--play",
        action="store_true",
        help="Play the audio after saving",
    )
    speak.set_defaults(func=cmd_speak)

    voices = subparsers.add_parser("voices", help="List available voices")
    voices.set_defaults(func=cmd_voices)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
