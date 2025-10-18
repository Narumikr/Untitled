import os

# ✅ get the current directory path
script_dir = os.path.dirname(os.path.abspath(__file__))

# components
components_dir = os.path.join(script_dir, "../src/components")
components_index_file = os.path.join(components_dir, "index.ts")

# hooks
hooks_dir = os.path.join(script_dir, "../src/hooks")
hooks_index_file = os.path.join(hooks_dir, "index.ts")

# utils
utils_dir = os.path.join(script_dir, "../src/utils")
utils_index_file = os.path.join(utils_dir, "index.ts")

# check components directory exists
def checkDirectoryExist(directory_path):
    if not os.path.exists(directory_path):
        print(f"❌ Error: Not found!! no such a directory: {directory_path}")
        exit(1)

# read all "**/*.tsx" files in the components directory
def getFolderAndTsxFileNameList(directory_path):
    file_name_list = []
    for folder in sorted(os.listdir(directory_path)):
        folder_path = os.path.join(directory_path, folder)
        if os.path.isdir(folder_path):
            for file in sorted(os.listdir(folder_path)):
                if file.endswith(".tsx"):
                    file_name = os.path.splitext(file)[0]
                    file_name_list.append((folder, file_name))
    return file_name_list

# read all ".ts" files in the directory
def getTsFileNameList(directory_path):
    file_name_list = []
    for file in sorted(os.listdir(directory_path)):
        if file.endswith(".ts"):
            file_name = os.path.splitext(file)[0]
            if 'index' != file_name:
                file_name_list.append(file_name)
    return file_name_list

def outputIndexFile(output_file_path, output_text):
    # write to index.ts
    with open(output_file_path, "w", encoding="utf-8", newline='\n') as f:
        f.write(output_text)

    print(f"✅ Completed!! generate `index.ts`\n📁 output file path: {output_file_path}")

if __name__ == "__main__":
    # generate components indexfile
    checkDirectoryExist(components_dir)
    components_list = getFolderAndTsxFileNameList(components_dir)
    exports_components = "".join([f"export * from './{folder}/{file_name}'\n" for folder, file_name in components_list])
    outputIndexFile(components_index_file, exports_components)

    # generate hooks indexfile
    checkDirectoryExist(hooks_dir)
    hooks_list = getTsFileNameList(hooks_dir)
    exports_hooks = "".join([f"export * from './{file_name}'\n" for file_name in hooks_list])
    outputIndexFile(hooks_index_file, exports_hooks)

    # generate utils indexfile
    checkDirectoryExist(utils_dir)
    utils_list = getTsFileNameList(utils_dir)
    exports_utils = "".join([f"export * from './{file_name}'\n" for file_name in utils_list])
    outputIndexFile(utils_index_file, exports_utils)