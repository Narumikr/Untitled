#!/usr/bin/env python3
"""
Build package.dist.json from package.json
This script automatically extracts necessary fields for distribution
"""

import json
import sys
import shutil
from pathlib import Path


def strip_dist_prefix(path_str):
    """Remove 'dist/' prefix from a path string for dist/package.json"""
    if isinstance(path_str, str):
        if path_str.startswith("./dist/"):
            return "./" + path_str[len("./dist/"):]
        if path_str.startswith("dist/"):
            return path_str[len("dist/"):]
    return path_str


def transform_dist_paths(package_data):
    """Transform paths in package data to be relative to dist/ directory"""
    # Transform simple path fields
    for field in ["main", "module", "types", "style"]:
        if field in package_data:
            package_data[field] = strip_dist_prefix(package_data[field])

    # Transform exports field recursively
    if "exports" in package_data:
        package_data["exports"] = transform_exports(package_data["exports"])

    # Transform sideEffects array
    if "sideEffects" in package_data and isinstance(package_data["sideEffects"], list):
        package_data["sideEffects"] = [
            strip_dist_prefix(item) for item in package_data["sideEffects"]
        ]

    return package_data


def transform_exports(obj):
    """Recursively transform path values in exports field"""
    if isinstance(obj, str):
        return strip_dist_prefix(obj)
    if isinstance(obj, dict):
        return {k: transform_exports(v) for k, v in obj.items()}
    return obj


def build_package_dist_json():
    """Extract distribution fields from package.json and create package.dist.json"""

    # Get paths
    script_dir = Path(__file__).parent
    root_dir = script_dir.parent
    package_json_path = root_dir / "package.json"
    package_dist_json_path = root_dir / "package.dist.json"

    print("Building package.dist.json from package.json...")

    # Check if package.json exists
    if not package_json_path.exists():
        print(f"Error: package.json not found at {package_json_path}", file=sys.stderr)
        sys.exit(1)

    # Read package.json
    try:
        with open(package_json_path, "r", encoding="utf-8") as f:
            package_data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"Error: Failed to parse package.json: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: Failed to read package.json: {e}", file=sys.stderr)
        sys.exit(1)

    # Extract necessary fields for distribution
    dist_fields = [
        "name",
        "version",
        "description",
        "main",
        "module",
        "types",
        "style",
        "exports",
        "type",
        "keywords",
        "author",
        "license",
        "peerDependencies",
        "dependencies",
        "sideEffects",
    ]

    package_dist_data = {}
    for field in dist_fields:
        if field in package_data:
            package_dist_data[field] = package_data[field]

    # Transform paths for dist/package.json
    # Root package.json uses paths like "dist/cjs/index.js" (relative to project root)
    # dist/package.json needs paths like "cjs/index.js" (relative to dist directory)
    package_dist_data = transform_dist_paths(package_dist_data)

    # Write package.dist.json
    try:
        with open(package_dist_json_path, "w", encoding="utf-8") as f:
            json.dump(package_dist_data, f, indent=2, ensure_ascii=False)
            f.write("\n")  # Add trailing newline
    except Exception as e:
        print(f"Error: Failed to write package.dist.json: {e}", file=sys.stderr)
        sys.exit(1)

    print("✓ Successfully created package.dist.json")

    # Display synchronized dependencies
    if "dependencies" in package_dist_data:
        print("  Dependencies version synchronized:")
        for dep, version in package_dist_data["dependencies"].items():
            print(f"    {dep}: {version}")

    if "peerDependencies" in package_dist_data:
        print("  Peer dependencies version synchronized:")
        for dep, version in package_dist_data["peerDependencies"].items():
            print(f"    {dep}: {version}")

    return package_dist_json_path


def create_cjs_package_json():
    """Create package.json in dist/cjs to specify CommonJS module type"""

    # Get paths
    script_dir = Path(__file__).parent
    root_dir = script_dir.parent
    dist_cjs_dir = root_dir / "dist" / "cjs"
    cjs_package_json_path = dist_cjs_dir / "package.json"

    print("\nCreating package.json in dist/cjs...")

    # Check if dist/cjs exists
    if not dist_cjs_dir.exists():
        print(f"Error: dist/cjs directory not found at {dist_cjs_dir}", file=sys.stderr)
        print("  Please run the build process first to create dist/cjs/", file=sys.stderr)
        sys.exit(1)

    # Create package.json with type: commonjs
    cjs_package_data = {
        "type": "commonjs"
    }

    try:
        with open(cjs_package_json_path, "w", encoding="utf-8") as f:
            json.dump(cjs_package_data, f, indent=2, ensure_ascii=False)
            f.write("\n")  # Add trailing newline
        print(f"✓ Successfully created {cjs_package_json_path}")
    except Exception as e:
        print(f"Error: Failed to create dist/cjs/package.json: {e}", file=sys.stderr)
        sys.exit(1)


def copy_package_to_dist():
    """Copy package.dist.json to dist/package.json"""

    # Get paths
    script_dir = Path(__file__).parent
    root_dir = script_dir.parent
    package_dist_json_path = root_dir / "package.dist.json"
    dist_dir = root_dir / "dist"
    dist_package_json_path = dist_dir / "package.json"

    print("\nCopying package.dist.json to dist/package.json...")

    # Check if package.dist.json exists
    if not package_dist_json_path.exists():
        print(f"Error: package.dist.json not found at {package_dist_json_path}", file=sys.stderr)
        print("  Please run build_package_dist_json() first", file=sys.stderr)
        sys.exit(1)

    # Create dist directory if it doesn't exist
    if not dist_dir.exists():
        print(f"Error: dist directory not found at {dist_dir}", file=sys.stderr)
        print("  Please run the build process first to create dist/", file=sys.stderr)
        sys.exit(1)

    # Copy package.dist.json to dist/package.json
    try:
        shutil.copy2(package_dist_json_path, dist_package_json_path)
        print(f"✓ Successfully copied to {dist_package_json_path}")
    except Exception as e:
        print(f"Error: Failed to copy package.dist.json: {e}", file=sys.stderr)
        sys.exit(1)

    # Delete package.dist.json after successful copy
    try:
        package_dist_json_path.unlink()
        print(f"✓ Deleted temporary file {package_dist_json_path}")
    except Exception as e:
        print(f"Warning: Failed to delete package.dist.json: {e}", file=sys.stderr)


if __name__ == "__main__":
    build_package_dist_json()
    copy_package_to_dist()
    create_cjs_package_json()