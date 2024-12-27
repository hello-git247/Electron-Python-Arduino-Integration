import sys

def run_python_code(code):
    try:
        exec(code)
        return "Code executed successfully"
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    code = sys.argv[1]  # Receive code from command line argument
    result = run_python_code(code)
    print(result)
